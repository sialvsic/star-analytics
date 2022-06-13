// thunk
function thunk_template() {

}

function thunk(extraData) {
  return function(store) {
    return function(next) {
      return function(action) {
        if(typeof action === 'function') {
          return action(store.dispatch, extraData)
        } else {
          return next(action)
        }
      }
    }
  }
}

// function createThunkMiddleware(extraArgument) {
//   return ({ dispatch, getState }) => next => action => {
//     if (typeof action === 'function') {
//       return action(dispatch, getState, extraArgument);
//     }
//
//     return next(action);
//   };
// }
//
// const thunk = createThunkMiddleware();
// thunk.withExtraArgument = createThunkMiddleware;

module.exports = thunk;


