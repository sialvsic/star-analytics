const Redux = require('redux');

// compose(funcA, funcB, funcC) 形象为 compose(funcA(funcB(funcC())))）

function A() {
  console.log('A');
}

function B() {
  console.log('B');
}

function C() {
  console.log('C');
}

A();
B();
C();

A(B(C()));

console.log('*******');
console.log('Compose');

let cp1 = Redux.compose(A, B, C);
cp1(); //注意执行顺序

let cp2 = Redux.compose(A);
cp2();

//========================================
function middleware1(obj) {
  //double Age
  obj.age = obj.age * 2;
  return obj
}

function middleware2(obj) {
  //add Age
  obj.age = 18;
  return obj;
}

function middleware3(obj) {
  //add Name
  obj.name = 'xing';
  return obj;
}

let obj = {};
let enhancer = Redux.compose(middleware1, middleware2, middleware3);
enhancer(obj);

console.log('*******');
console.log(obj);

//========================================

function middlewareX(rate) {
  //double Age
  return function(obj) {
    console.log('middlewareX');
    console.log(obj);
    obj.age = obj.age * rate;
    return obj
  }
}

function middlewareY(age) {
  //add Age
  return function(obj) {
    console.log('middlewareY');
    console.log(obj);
    obj.age = age;
    return obj;
  }
}

function middlewareZ(name) {
  //add Name
  return function(obj) {
    console.log('middlewareZ');
    console.log(obj);
    obj.name = name;
    return obj
  };
}

let eObj = {};
let enhancerPlus = Redux.compose(middlewareX(2), middlewareY(18), middlewareZ('xing'));
enhancerPlus(eObj);

console.log('*******');
console.log(eObj);
