//combineReducers
const createStore = require('../../lib/createStore_V1');
const combineReducers = require('../../lib/combineReducers');

const initialState = {
  todos: [
    {
      text: 'Consider using Redux',
    },
  ]
};

const initialJobs = {
  jobs: ['dev', 'qa']
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

function jobApps(state = initialJobs, action) {
  switch(action.type) {
    case 'ADD_JOB':
      return Object.assign({}, state, {
        jobs: [
          ...state.jobs,
          action.text
        ]
      });
    default:
      return state
  }
}

const RootReducer = combineReducers({todo: todoApps, job: jobApps});

console.log(todoApps);
console.log(jobApps);
console.log(RootReducer);

const store = createStore(RootReducer);

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
  type: 'ADD_JOB',
  text: 'PM'
});

console.log(store.getState());
