import React from "react";
import StyledComponent from "./StyledComponent";
import NewStyledComponent from "./NewStyledComponent";
import "./css/index.scss";

const App = () => (
  <div>
    <p>implement by styled component</p>
    <StyledComponent />
    <p>implement by us</p>
    <NewStyledComponent />
  </div>
);

export default App;
