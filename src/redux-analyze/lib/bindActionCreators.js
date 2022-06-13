//bindAddToDo = bindActionCreators(AddTodo, dispatch)
//bindAddToDo('try redux');
//
//输入: bindActionCreators(AddTodo, dispatch)
//输出: Function or {}

function bindActionCreator(actionCreator, dispatch) {
  return function() {
    return dispatch(actionCreator.apply(this, arguments))
  }
}

function bindActionCreators(fn, dispatch) {
  if(typeof fn === 'function') {
    return bindActionCreator(fn, dispatch)
  }

  const keys = Object.keys(fn);
  let result = {};

  keys.forEach((key) => {
    const actionCreator = fn[key];

    if(typeof actionCreator === 'function') {
      result[key] = bindActionCreator(actionCreator, dispatch)
    }
  });

  return result;
}

module.exports = bindActionCreators;
