// applyMiddleware(...middleWares)
const createStore = require('../../lib/createStore');
const applyMiddleware = require('../../lib/applyMiddleware');

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

let initialCount = 10;

const store = createStore(todoApps, initialState, applyMiddleware(Count(initialCount)));

console.log(store.dispatch.toString());

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

