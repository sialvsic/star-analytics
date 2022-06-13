//rootReducer = combineReducers({potato: potatoReducer, tomato: tomatoReducer})
//输入: combineReducers(reducers)
//输出:
// [Function: combination]

function combineReducers_template(reducers) {

  return function() {

  }
}

function combineReducers(reducers) {
  let old_keys = [];
  let old_reducers = {};

  //保存原先的reducer的key和值
  Object.keys(reducers).forEach((key) => {
    if(typeof reducers[key] === 'function') {
      old_keys.push(key);
      old_reducers[key] = reducers[key];
    }
  });

  return function(state = {}, action) {
    let nextState = {};
    let hasChanges = false;

    old_keys.forEach((key) => {
      nextState[key] = old_reducers[key](state[key], action);
      if(!hasChanges) {
        hasChanges = state[key] !== nextState[key];
      }
    });

    return hasChanges ? nextState : state
  }
}

module.exports = combineReducers;



