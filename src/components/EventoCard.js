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

const Tag = styled.span`
  display: inline-block;
  background-color: ${props => props.color || '#333'};
  color: #fff;
  border-radius: 4px;
  padding: 2px 8px;
  font-size: 12px;
  margin-right: 8px;
`;

const EventoCard = ({ evento }) => (
  <CardWrapper>
    <CardText>
      <CardTitle>{evento.nome}</CardTitle>
      <CardInfo>
        <Tag color={evento.tipo === 'Futebol' ? '#3A7D44' : '#FFB347'}>
          {evento.tipo}
        </Tag>
        {evento.local}
      </CardInfo>
    </CardText>
    {/* <MoreOptionsIcon /> */}
  </CardWrapper>
);

export default EventoCard;
