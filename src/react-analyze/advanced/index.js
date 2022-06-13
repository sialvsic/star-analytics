//parcel V2 无法使用，会使用官方的React.createElement的方法，而不是自定义的
import React from './react';
import * as ReactDOM from './react-dom';

function RB(props) {
  return <h2>
    这是一个h2组件 {props.name}
  </h2>;
}

class RB2 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h2 className={'123'}>
        这是一个h2组件 {this.props.name}
      </h2>
    );
  }
}

ReactDOM.render(
  <div id='react-root'>
    this is root element
    <RB2 name={'react demo1'} />
    <RB name={'react demo2'} />
  </div>,
  document.getElementById('root'),
);

