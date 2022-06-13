//createStore_V1
const createStore = require('../../lib/createStore_V1');

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

const store = createStore(todoApps);

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

console.log(store.getState());
