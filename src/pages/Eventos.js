import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getEventos, deleteEvento } from '../services/api';

const Eventos = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    fetchEventos();
  }, []);

  const fetchEventos = async () => {
    try {
      const response = await getEventos();
      setEventos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEvento(id);
      fetchEventos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header />
      <h2>Eventos</h2>
      <Link to="/add-evento">Adicionar Evento</Link>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Local</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {eventos.map((evento) => (
            <tr key={evento.id}>
              <td>{evento.nome}</td>
              <td>{evento.tipo}</td>
              <td>{evento.local.nome}</td>
              <td>{new Date(evento.data).toLocaleDateString()}</td>
              <td>
                <Link to={`/edit-evento/${evento.id}`}>Editar</Link>
                <button onClick={() => handleDelete(evento.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Eventos;