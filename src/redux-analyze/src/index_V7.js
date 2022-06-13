// thunk
const Redux = require('redux');
var ReduxThunk = require('redux-thunk').default;

//({ getState, dispatch }) => next => action

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

console.log(ReduxThunk);
let initialCount = 10;

const RootReducer = Redux.combineReducers({ todo: todoApps, job: jobApps });
// const store = Redux.createStore(RootReducer, Redux.applyMiddleware(Count(initialCount), logger, ReduxThunk));
const store = Redux.createStore(RootReducer, Redux.applyMiddleware(Count(initialCount), logger, ReduxThunk));

store.subscribe(function() {
  console.log('I am run1');
});

store.subscribe(function() {
  console.log('I am run2');
});

console.log(store.getState());

//for thunk
function waitFn(time) {
  return function(dispatch, extraData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('time end');
        dispatch(AddJob('PM'));
        resolve();
        console.log('+++++++++++++++');
      }, time);
    })
  }
}

console.log('store.dispatch.toString()');
console.log(store.dispatch.toString());

store.dispatch(waitFn(2000));

function AddJob(job) {
  return {
    type: 'ADD_JOB',
    text: job
  }
}

store.dispatch({
  type: 'ADD_TODO',
  text: 'try redux'
});

store.dispatch({
  type: 'ADD_TODO',
  text: 'try middleware'
});

console.log(store.getState());

