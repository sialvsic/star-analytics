// let store = createStore(reducers, applyMiddleware(thunk));
//输入: createStore(reducer, [preloadedState])
//输出: Store = { subscribe, getState, dispatch }

function createStore_template(reducers, initialState) {
  let store = {};
  let state = initialState;
  let listeners = [];

  store.subscribe = function(fn) {
    listeners.push(fn)
  };

  store.getState = function() {
    return state;
  };

  //dispatch -> action -> reducer -> store
  store.dispatch = function(action) {
    state = reducers(state, action);
    listeners.forEach((fn) => {
      fn();
    });
  };

  store.dispatch({ type: INIT });

  return store
}

const INIT = `@@redux/INIT`;

function createStore_V1(reducers, initialState) {
  let store = {};
  let state;
  let listeners = [];

  store.subscribe = function(fn) {
    if(typeof fn === 'function') {
      listeners.push(fn)
    }
  };

  store.getState = function() {
    return state;
  };

  store.dispatch = function(action) {
    state = reducers(state, action);
    listeners.forEach((listener) => {
      listener();
    })
  };

  if(initialState === undefined) {
    store.dispatch({ type: INIT });
  }

  return store
}

module.exports = createStore_V1;
