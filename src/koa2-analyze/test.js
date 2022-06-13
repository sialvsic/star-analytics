function add(x, y) {
  return x + y;
}

function square(z) {
  return z * z;
}

function double(z) {
  return z * z;
}

const result = square(add(1, 2));

console.log(result);

//复合函数 同步
function compose(middlewares) {
  return middlewares.reduce((fn1, fn2) => (...args) => {
    return fn2(fn1(...args));
  });
}

const middlewares = [add, square, double];

const func = compose(middlewares);
console.log(func(1, 2));

//复合函数 异步
function asyncCompose(middlewares) {
  return function () {
    function dispatch(i) {
      let fn = middlewares[i];
      if (!fn) {
        return Promise.resolve();
      }

      return Promise.resolve(
        fn(function next() {
          return dispatch(i + 1);
        })
      );
    }

    return dispatch(0);
  };
}

async function fn1(next) {
  console.log("fn1");
  await next();
  console.log("end fn1");
}

async function fn2(next) {
  console.log("fn2");
  await delay();
  await next();
  console.log("end fn2");
}

function fn3() {
  console.log("fn3");
}

function delay() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

const asyncMiddlewares = [fn1, fn2, fn3];

const asyncFunc = asyncCompose(asyncMiddlewares);
console.log(asyncFunc());
