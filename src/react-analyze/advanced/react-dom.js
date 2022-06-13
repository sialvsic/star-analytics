import { initVNode } from './vdom';

export function render(vdom, container) {

  let rootNode = initVNode(vdom);
  console.log('vdom', vdom);
  console.log('container', container);

  container && container.appendChild(rootNode);
}
