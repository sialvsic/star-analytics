
//要将 add 函数的第一个参数 foo 标识符修改为a
var babel = require("@babel/core");
var types = require('@babel/types');

const code = `const a = 1, b = 2;
function add(foo, bar) {
  console.log(a, b)
  return foo + bar
}`;

const visitor = {
  // 将第一个参数名转换为a
  FunctionDeclaration(path) {
    const firstParams = path.get('params.0')
    if (firstParams == null) {
      return
    }

    const name = firstParams.node.name
    // 递归遍历，这是插件常用的模式。这样可以避免影响到外部作用域
    path.traverse({
      Identifier(path) {
        if (path.node.name === name) {
          path.replaceWith(types.identifier('a'))
        }
      }
    })
  },
};

const result = babel.transform(code, {
  plugins: [{
    visitor: visitor
  }]
});

console.log(result.code)
//output

/*
const a = 1,
      b = 2;

function add(a, bar) {
  console.log(a, b);
  return a + bar;  <== 错误，将此处的a也错误的替换了
}
*/