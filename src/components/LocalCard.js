import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
  background: #161B22;
  padding: 16px;
  border-radius: 8px;
  margin: 8px 0;
  color: #EBF0F9;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardText = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h4`
  margin: 0;
  font-size: 16px;
`;

const CardInfo = styled.p`
  margin: 4px 0;
  font-size: 14px;
  color: #BABBBF;
`;

const LocalCard = ({ local }) => (
  <CardWrapper>
    <CardText>
      <CardTitle>{local.nome}</CardTitle>
      <CardInfo>{local.endereco}</CardInfo>
      <CardInfo>{local.email}</CardInfo>
    </CardText>
    {/* <MoreOptionsIcon /> */}
  </CardWrapper>
);

export default LocalCard;
