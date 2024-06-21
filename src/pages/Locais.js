import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getLocais } from '../services/api';

const Locais = () => {
  const [locais, setLocais] = useState([]);

  useEffect(() => {
    getLocais()
      .then(response => setLocais(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <Header />
      <h2>Locais</h2>
      <Link to="/add-local">Adicionar Local</Link>
      <ul>
        {locais.map(local => (
          <li key={local.id}>
            <Link to={`/edit-local/${local.id}`}>{local.nome}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Locais;