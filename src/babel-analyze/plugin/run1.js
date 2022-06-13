const { transformFileSync } = require('@babel/core');
const insertParametersPlugin = require('./plugin1.js');
const path = require('path');

const { code } = transformFileSync(path.join(__dirname, './code1.js'), {
  plugins: [insertParametersPlugin],
  parserOpts: {
    sourceType: 'module',
    plugins: ['jsx']
  }
});

console.log('code:');
console.log(code);