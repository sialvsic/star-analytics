//将abs的函数名字替换掉

var babel = require("@babel/core");
var types = require('@babel/types');

const code = `abs(-8);`;

const visitor = {
  // CallExpression(path) {
  //   if (path.node.callee.name !== 'abs') return;
  //   path.replaceWith(t.callExpression(
  //     t.memberExpression(t.identifier('Math'), t.identifier('abs')),
  //     path.node.arguments
  //   ));
  // } 

  CallExpression: {
    enter(path, state) {
      console.log('CallExpression enter');
      console.log(path.node.callee.name);
      if (path.node.callee.name !== 'abs') return;
      path.replaceWith(types.callExpression(
        types.memberExpression(types.identifier('Math'), types.identifier('abs')),
        path.node.arguments
      ));
    },
    exit(path, state) {
      console.log('CallExpression exit');
    }
  }
};

const result = babel.transform(code, {
  plugins: [{
    visitor: visitor
  }]
});

console.log(result.code);
// Math.abs(-8);