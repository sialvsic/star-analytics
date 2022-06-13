const compose = require('./compose');

//applyMiddleware(...middleWares)
//
//输入: applyMiddleware(...middleWares)
//输出:

function applyMiddleware_template(...middleWares) {

}

//enhance store
function applyMiddleware(...middleWares) {
  return function(store) {
    let chains = middleWares.map((middleWare) => {
      return middleWare(store)
    });

    //利用compose的能力将store.dispatch进行传入，内部将会调用dispatch
    //实现了增强dispatch的功能
    store.dispatch = compose(...chains)(store.dispatch);

    console.log(store.getState());
    return store;
  }
}

//middleware
//({ getState, dispatch }) => next => action
function middleware(store) {
  return function(next) {
    return function(action) {
      next(action)
    }
  }
}

module.exports = applyMiddleware;
