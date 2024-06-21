import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Alterado para useNavigate
import Header from '../components/Header';
import { getEventoById, updateEvento, getLocais } from '../services/api';

const EditEvento = () => {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [localId, setLocalId] = useState('');
  const [locais, setLocais] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvento();
    fetchLocais();
  }, [id]);

  const fetchEvento = async () => {
    try {
      const response = await getEventoById(id);
      const evento = response.data;
      setNome(evento.nome);
      setTipo(evento.tipo);
      setData(evento.data.split('T')[0]);
      setHorario(evento.horario);
      setLocalId(evento.localId);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLocais = async () => {
    try {
      const response = await getLocais();
      setLocais(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedEvento = { nome, tipo, data, horario, localId };
    try {
      await updateEvento(id, updatedEvento);
      navigate('/eventos');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header />
      <h2>Editar Evento</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome do evento" required />
        <input type="text" value={tipo} onChange={(e) => setTipo(e.target.value)} placeholder="Tipo" required />
        <input type="date" value={data} onChange={(e) => setData(e.target.value)} required />
        <input type="time" value={horario} onChange={(e) => setHorario(e.target.value)} required />
        <select value={localId} onChange={(e) => setLocalId(e.target.value)} required>
          <option value="">Selecione um Local</option>
          {locais.map((local) => (
            <option key={local.id} value={local.id}>{local.nome}</option>
          ))}
        </select>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default EditEvento;