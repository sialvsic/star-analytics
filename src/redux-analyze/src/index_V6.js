// logger
const Redux = require('redux');

//({ getState, dispatch }) => next => action

const initialState = {
  todos: [
    {
      text: 'Consider using Redux',
    },
  ]
};

function todoApps(state = initialState, action) {
  console.log(state);
  switch(action.type) {
    case 'ADD_TODO':
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            text: action.text,
          }
        ]
      });
    default:
      return state
  }
}

function Count(count) {
  return function(store) {
    return function(next) {
      return function(action) {
        console.log(count++);
        // console.log(next);
        // console.log(action);
        return next(action)
      }
    }
  }
}

function logger({ getState }) {
  return next => action => {
    console.log('will dispatch', action);

    // 调用 middleware 链中下一个 middleware 的 dispatch。
    const returnValue = next(action);

    console.log('state after dispatch', getState());

    // 一般会是 action 本身，除非
    // 后面的 middleware 修改了它。
    return returnValue
  }
}

let initialCount = 10;
const store = Redux.createStore(todoApps, initialState, Redux.applyMiddleware(Count(initialCount), logger));

store.subscribe(function() {
  console.log('I am run1');
});

store.subscribe(function() {
  console.log('I am run2');
});

console.log(store.getState());

store.dispatch({
  type: 'ADD_TODO',
  text: 'try redux'
});

store.dispatch({
  type: 'ADD_TODO',
  text: 'try middleware'
});

console.log(store.getState());

