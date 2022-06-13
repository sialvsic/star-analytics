function Element(tagName, props, children) {
    this.tagName = tagName;
    this.props = props;
    this.children = children;
}

Element.prototype.render = function () {
    // 根据tagName创建一个真实的元素
    var el = document.createElement(this.tagName);
    // 得到这个元素的属性对象，方便我们遍历。
    var props = this.props;

    for (var propName in props) {
        // 获取到这个元素值
        var propValue = props[propName];

        // 通过setAttribute设置元素属性。
        el.setAttribute(propName, propValue);
    }

    // 注意： 这里的children，我们传入的是一个数组，所以，children不存在时我们用[]来替代。
    var children = this.children || [];

    //遍历children
    children.forEach(function (child) {
        var childEl = (child instanceof Element)
            ? child.render()
            : document.createTextNode(child);
        // 无论childEl是元素还是文字节点，都需要添加到这个元素中。
        el.appendChild(childEl);
    });

    return el;
};

const ul = new Element('ul', { id: 'list' }, [
    new Element('li', { class: 'item' }, ['item1']),
    new Element('li', { class: 'item' }, ['item2']),
    new Element('ul', { class: 'item' }, [
        new Element('li', { class: 'item' }, ['item1']),
        new Element('li', { class: 'item' }, ['item2']),
        new Element('li', { class: 'item' }, ['item3'])
    ])
]);

const ulRoot = ul.render();

document.body.appendChild(ulRoot);