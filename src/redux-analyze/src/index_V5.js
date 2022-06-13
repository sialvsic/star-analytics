const Redux = require('redux');
// applyMiddleware(...middleware)


//middleware
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
        console.log(++count);
        // console.log(next);
        // console.log(action);
        return next(action)
      }
    }
  }
}

let initialCount = 10;
const store = Redux.createStore(todoApps, initialState, Redux.applyMiddleware(Count(initialCount)));

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

