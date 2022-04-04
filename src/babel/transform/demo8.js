// console.log 等 api 中插入文件名和行列号的参数
// demo7的简化版本
var babel = require("@babel/core");
var types = require('@babel/types');
var generate = require('@babel/generator').default;

const code = `
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
    const calleeName = generate(path.node.callee).code;
    if (targetCalleeName.includes(calleeName)) {
      const { line, column } = path.node.loc.start;
      path.node.arguments.push(types.stringLiteral(`filename: (${line}, ${column})`))
    }
  },
};

const result = babel.transform(code, {
  "presets": ["@babel/preset-react"],
  "plugins": [
    {
      visitor: visitor
    }
  ],
});

console.log(result.code)
//output

/*
console.log(1, "filename: (2, 0)");

function func() {
  console.info(2, "filename: (5, 8)");
}

export default class Clazz {
  say() {
    console.debug(3, "filename: (10, 12)");
  }

  render() {
    return React.createElement("div", null, console.error(4, "filename: (13, 25)", "filename: (13, 25)"));
  }
}
*/