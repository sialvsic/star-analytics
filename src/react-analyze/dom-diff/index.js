// 首先引入对应的方法来创建虚拟DOM
import { createElement, render, renderDom } from './element';
import diff from './diff'
import patch from './patch'

let virtualDom = createElement('ul', { class: 'list' }, [
  createElement('li', { class: 'item' }, ['周杰伦']),
  createElement('li', { class: 'item' }, ['林俊杰']),
  createElement('li', { class: 'item' }, ['王力宏'])
]);

console.log(virtualDom);

/*
参数分析
type: 指定元素的标签类型，如'li', 'div', 'a'等
props: 表示指定元素身上的属性，如class, style, 自定义属性等
children: 表示指定元素是否有子节点，参数以数组的形式传入
*/

let el = render(virtualDom); // 渲染虚拟DOM得到真实的DOM结构
console.log(el);
// 直接将DOM添加到页面内
renderDom(el, document.getElementById('root'));

let virtualDom2 = createElement('ul', { class: 'list' }, [
  createElement('li', { class: 'item-1' }, ['周杰伦1']),
  createElement('li', { class: 'item' }, ['林俊杰']),
  createElement('li', { class: 'item' }, ['王力宏'])
]);

// let virtualDom2 = createElement('ul', { class: 'list-group' }, [
//   createElement('li', { class: 'item active' }, ['七里香2']),
//   createElement('div', { class: 'item' }, [
//     createElement('div', { class: 'item' }, ['一千年以后1']),
//     createElement('div', { class: 'item' }, ['一千年以后2'])
//   ]),
//   createElement('li', { class: 'item' }, ['需要人陪'])
// ]);

// diff一下两个不同的虚拟DOM
let patches = diff(virtualDom, virtualDom2);
console.log(patches);
// 将变化打补丁，更新到el
patch(el, patches);
