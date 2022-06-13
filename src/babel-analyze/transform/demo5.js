
//重命名函数参数 foo, 不仅要考虑外部的作用域, 也要考虑下级作用域的绑定情况
var babel = require("@babel/core");
var types = require('@babel/types');

const code = `const a = 1, b = 2;

function add(foo, bar) {
  console.log(a, b)
  return () => {
    const a = '10' // 新增了一个变量声明
    return a + (foo + bar)
  }
}
console.log(add(2,3)());
`;

const visitor = {
  FunctionDeclaration(path) {
    const firstParam = path.get('params.0')
    if (firstParam == null) {
      return
    }
    let i = path.scope.generateUid('a') // 也可以使用generateUid
    path.scope.rename(firstParam.node.name, i)
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

function add(_a, bar) {
  console.log(a, b);
  return () => {
    const a = '10'; // 新增了一个变量声明

    return a + (_a + bar);
  };
}

console.log(add(2, 3)());
*/