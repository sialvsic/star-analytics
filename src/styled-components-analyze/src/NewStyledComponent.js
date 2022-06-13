import React from 'react';

const primaryColor = 'blue';
const myStyled = () => () => class Button extends React.Component {
  render() {
    return <div>
      this is my styled
    </div>;
  }
};

const myStyled1 = (TargetComponent) => ([style]) => class Button extends React.Component {
  componentDidMount() {
    this.element.setAttribute('style', style);
  }

  render() {
    return <div>
      <TargetComponent { ...this.props }
        ref={ element => this.element = element }/>
    </div>;
  }
};

const myStyled2 = (TargetComponent) => (
  strs, ...exprs) => class Button extends React.Component {
  componentDidMount() {
    this.interpolateStyle();
  }

  componentDidUpdate() {
    this.interpolateStyle();
  }

  interpolateStyle() {
    /*
    exprs:
      0: ƒ (_ref3)
      1: ƒ (_ref4)
      2: "blue"
    * */
    const style = exprs.reduce((result, expr, index) => {
      const isFunc = typeof expr === 'function';
      const value = isFunc ? expr(this.props) : expr;

      return result + value + strs[index + 1];
    }, strs[0]);

    this.element.setAttribute('style', style);
  }

  render() {
    return <div>
      <TargetComponent { ...this.props }
        ref={ element => this.element = element }/>
    </div>;
  }
};

const Button = myStyled('button')([
  'color: coral;' +
  'padding: 0.25rem 1rem;' +
  'border: solid 2px coral;' +
  'border-radius: 3px;' +
  'margin: 0.5rem;' +
  'font-size: 1rem;',
]);

const Button1 = myStyled1('button')`
  color: coral; 
  padding: 0.25rem 1rem; 
  border: solid 2px coral; 
  border-radius: 3px;
  margin: 0.5rem;
  font-size: 20px;
`;

const Button2 = myStyled2('button')`
  background: ${ ({ primary }) => primary ? 'white ' : primaryColor };
  color: ${ ({ primary }) => primary ? primaryColor : 'white' }; 
  padding: 0.25rem 1rem; 
  border: solid 2px ${ primaryColor }; 
  border-radius: 3px;
  margin: 0.5rem;
`;

const NewStyledComponent = () => {
  return <div>
    <Button1>button 1</Button1>
    <Button2 primary={ 'true' }>button 2</Button2>
  </div>;
};

export default NewStyledComponent;
