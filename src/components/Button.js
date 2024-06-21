import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.button`
  background: #99C766;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: #85b257;
  }
`;

const Button = ({ onClick, children }) => (
  <ButtonWrapper onClick={onClick}>
    {children}
  </ButtonWrapper>
);

export default Button;
