import React from "react";
import Provider from "../lib/provider";
import Calculator from "./component/Calculator";
import redux from "@sialvsic/redux";

const initialState = {
  calculate: {
    result: 0,
  },
};

const reducers = function (state = initialState, action) {
  switch (action.type) {
    case "ADD":
      return Object.assign({}, state, {
        calculate: {
          ...state.calculate,
          result: state.calculate.result + action.value,
        },
      });

    case "MINUS":
      return Object.assign({}, state, {
        calculate: {
          ...state.calculate,
          result: state.calculate.result - action.value,
        },
      });
    default:
      return state;
  }
};

export const store = redux.createStore(reducers);

class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <Calculator time={Date.now()} />
      </Provider>
    );
  }
}

export default Root;
