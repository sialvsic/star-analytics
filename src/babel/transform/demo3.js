
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

    firstParams.replaceWith(types.identifier('a'))
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
  return foo + bar;
}
*/