import React from 'react';

export const MyContext = React.createContext({});

class Provider extends React.Component {
  constructor(props) {
    super(props);
    this.getState = this.getState.bind(this);
  }

  getState() {
    return this.props.store;
  }

  render() {
    return (
      <MyContext.Provider value={ { store: this.props.store } }>
        { this.props.children }
      </MyContext.Provider>
    );
  }

}

export default Provider;
