import React from 'react';
import styled from 'styled-components';

const TableWrapper = styled.div`
  background: #161B22;
  padding: 16px;
  border-radius: 8px;
  margin: 0px 0;
  color: #EBF0F9;
`;

const Table = styled.div`
  display: table;
  width: 100%;
`;

const TableRow = styled.div`
  display: table-row;
  background-color: ${props => props.index % 2 === 0 ? '#1B1F24' : '#161B22'};
`;

const TableCell = styled.div`
  display: table-cell;
  padding: 8px;
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

const EventoCard = ({ evento, index }) => (
  <TableWrapper>
    <Table>
      <TableRow index={index}>
        <TableCell>{evento.nome}</TableCell>
        <TableCell>
          <Tag color={evento.tipo === 'Futebol' ? '#3A7D44' : '#FFB347'}>
            {evento.tipo}
          </Tag>
          {evento.local.nome}
        </TableCell>
        <TableCell>{new Date(evento.data).toLocaleDateString()}</TableCell>
      </TableRow>
    </Table>
  </TableWrapper>
);

export default EventoCard;
