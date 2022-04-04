
//要将 add 函数中的cc标识符修改为dd
var babel = require("@babel/core");
var types = require('@babel/types');

const code = `const a = 1, b = 2;
function add(cc, bar) {
  console.log(cc, b);
  return foo + bar
}`;

const visitor = {
  // 将第一个参数名转换为a
  FunctionDeclaration(path) {
    const firstParams = path.get('params.0')
    if (firstParams == null) {
      return
    }

    path.scope.rename(firstParams.node.name, "dd")
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

function add(dd, bar) {
  console.log(dd, b);
  return foo + bar;
}
*/