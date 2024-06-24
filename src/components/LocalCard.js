import React from 'react';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';

const TableRow = styled.div`
  display: table-row;
  background-color: ${props => props.index % 2 === 0 ? '#6A5ACD' : '#1B1F24'};
`;

const TableCell = styled.div`
  display: table-cell;
  padding: 8px;
  text-overflow: ellipsis;
  vertical-align: middle;
  white-space: wrap;
`;

const LocalCard = ({ local, index }) => (
    <Table>
      <TableRow index={index}>
        <TableCell>{local.nome}</TableCell>
        <TableCell>{local.endereco.enderecoCompleto}</TableCell>
        <TableCell>{local.emailContato}</TableCell>
      </TableRow>
    </Table>
);

export default LocalCard;