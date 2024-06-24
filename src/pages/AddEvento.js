import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { addEvento, getLocais } from '../services/api';

const AddEvento = () => {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [localId, setLocalId] = useState('');
  const [locais, setLocais] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLocais();
  }, []);

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
    const newEvento = { nome, tipo, data, horario, localId };
    try {
    //   await addEvento(newEvento);
      navigate('/eventos');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header />
      <h2>Adicionar Evento</h2>
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
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
};

export default AddEvento;