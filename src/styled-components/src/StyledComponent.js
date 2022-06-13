import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  color: #ff9f26;
  width: 200px;
  height: 50px;
`;

const StyledComponent = () => {
  return <div>
    <Button>this button under the styled component</Button>
  </div>;
};

export default StyledComponent;
