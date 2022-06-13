import React from 'react';
import { MyContext } from '../lib/provider';

function connect(mapStateToProps, mapDispatchToProps) {
  return function (Component) {
    return class Proxy extends React.Component {
      static contextType = MyContext;

      constructor(props, context) {
        super(props);
        // 默认情况下，先调用 mapStateToProps 赋予默认值
        this.state = mapStateToProps(context.store.getState(), this.props);
      }

      componentDidMount() {
        // 每次更新都重新获取最新的状态
        this.context.store.subscribe(() => {
          this.setState(mapStateToProps(this.context.store.getState(), this.props));
        });
      }

      render() {
        return (
          <Component
            { ...mapStateToProps(this.context.store.getState(), this.props) }
            { ...mapDispatchToProps(this.context.store.dispatch, this.props) }
          />
        );
      }
    };
  };
}

export default connect;
