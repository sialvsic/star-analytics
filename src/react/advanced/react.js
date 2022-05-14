import { createVNode } from './vdom';

function createElement(type, props, ...children) {

  //区分不同的组件类型
  let vType;

  if (typeof type === 'string') {
    //字符串 就是普通的div这种元素
    vType = 1;
  } else if (typeof type === 'function') {
    //函数就是组件
    if (type.isReactComponent) {
      vType = 3;
    } else {
      vType = 2;
    }
  }

  return createVNode(vType, type, props, children);
}

class Component {
  //区别class组件和function组件
  static isReactComponent = true;

  constructor(props) {
    this.props = props;
    this.state = {};
  }

  setState() {
    //异步更新队列里面push任务
  }
}

class Updater {
  constructor() {

  }
}

export default {
  createElement,
  Component,
};
