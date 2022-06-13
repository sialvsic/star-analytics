// compose(funcA, funcB, funcC, funcD) 形象为 compose(funcA(funcB(funcC(funcD()))))）

function compose_template() {

}

function compose() {
  let args = Array.prototype.slice.call(arguments);

  if(args.length === 0) {
    return arg => arg;
  }

  if(args.length === 1) {
    return args[0]
  }

  // return args.reduce((a, b) => (...args) => a(b(...args)))
  return args.reduce(function(a, b) {
    return function(...args) {
      return a(b(...args));
    };
  })
}

module.exports = compose;


//分析
/*
const step1 = function(...args) {
  return a(b(...args));
};

const step2 = function(...args) {
  return step1(c(...args));
}

const step3 = function(...args) {
  return step2(d(...args));
}

step3('hello');
*/
