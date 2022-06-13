// 目的
var babel = require("@babel/core");
var types = require('@babel/types');

const code = ``;

// 预期
/*

*/


const visitor = {
  ImportDeclaration(path, state) {

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

*/