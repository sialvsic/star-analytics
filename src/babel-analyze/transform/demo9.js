// 在console.log 调用前插入文件名和行列号的参数
var babel = require("@babel/core");
var types = require('@babel/types');
var generate = require('@babel/generator').default;
var template = require('@babel/template').default;

const sourceCode = `
    console.log(1);
    function func() {
        console.info(2);
    }
    export default class Clazz {
        say() {
            console.debug(3);
        }
        render() {
            return <div>{console.error(4)}</div>
        }
    }
`;

// 预期
/*

*/

const targetCalleeName = ['log', 'info', 'error', 'debug'].map(item => `console.${item}`);

const visitor = {
  CallExpression(path, state) {

    console.log('path.node.isNew', path.node.isNew);
    console.log('path.node.callee', path.node.callee.object.name);
    console.log('path.node.callee', path.node.callee.property.name);

    if (path.node.isNew) {
      return;
    }

    const calleeName = generate(path.node.callee).code;
    if (targetCalleeName.includes(calleeName)) {
      const { line, column } = path.node.loc.start;

      const newNode = template.expression(`console.log("filename: (${line}, ${column})")`)();
      newNode.isNew = true;

      if (path.findParent(path => path.isJSXElement())) {
        path.replaceWith(types.arrayExpression([newNode, path.node]))
        path.stop();  // <==  ！！这里必须是stop 否则递归栈溢出
      } else {
        path.insertBefore(newNode);
      }
    }
  },
};

const result = babel.transform(sourceCode, {
  sourceType: 'module',
  // "presets": ["@babel/preset-react"],
  "plugins": [
    '@babel/plugin-transform-react-jsx',
    {
      visitor: visitor
    }
  ],
});

console.log(result.code)
//output

/*
console.log("filename: (2, 4)")
console.log(1);

function func() {
  console.log("filename: (4, 8)")
  console.info(2);
}

export default class Clazz {
  say() {
    console.log("filename: (8, 12)")
    console.debug(3);
  }

  render() {
    return React.createElement("div", null, [console.log("filename: (11, 25)"), console.error(4)]);
  }
}
*/