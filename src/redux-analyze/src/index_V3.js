const Redux = require('redux');

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
    case 'DELETE_JOB':
      const job = action.text;
      const index = state.jobs.indexOf(job);
      state.jobs.splice(index, 1);
      return {
        ...state,
      };
    default:
      return state
  }
}

const RootReducer = Redux.combineReducers({ todo: todoApps, job: jobApps });

console.log(todoApps);
console.log(jobApps);
console.log(RootReducer);

const store = Redux.createStore(RootReducer);

store.subscribe(function() {
  console.log('I am run1');
});

store.subscribe(function() {
  console.log('I am run2');
});

console.log(store.getState());

function AddTodo(text) {
  return {
    type: 'ADD_TODO',
    text: text
  }
}

const bindAddToDo = Redux.bindActionCreators(AddTodo, store.dispatch);

// store.dispatch({
//   type: 'ADD_TODO',
//   text: 'try redux'
// });

bindAddToDo('try redux');

function AddJob() {
  return {
    type: 'ADD_JOB',
    text: 'PM'
  }
}

function DeleteJob() {
  return {
    type: 'DELETE_JOB',
    text: 'dev'
  }
}

const bindJob = Redux.bindActionCreators({
  AddJob: AddJob,
  DeleteJob: DeleteJob
}, store.dispatch);

bindJob.AddJob();
bindJob.DeleteJob();
// store.dispatch({
//   type: 'ADD_JOB',
//   text: 'PM'
// });
// store.dispatch({
//   type: 'DELETE_JOB',
//   text: 'dev'
// });

console.log(store.getState());
