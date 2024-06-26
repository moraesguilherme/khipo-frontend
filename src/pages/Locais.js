import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaSearch, FaEllipsisV } from 'react-icons/fa';
import Header from '../components/Header';
import { getLocais, deleteLocal, searchLocais } from '../services/api';
import Notification from '../components/Notification';
import './Locais.css';

const Locais = () => {
  const [locais, setLocais] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(5);
  const [menuOpen, setMenuOpen] = useState(null);
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedNotification = localStorage.getItem('notification');
    if (storedNotification) {
      setNotification(JSON.parse(storedNotification));
      localStorage.removeItem('notification');
    } else if (location.state && location.state.notification) {
      setNotification(location.state.notification);
    }

    fetchLocais();
  }, [pageNumber, pageSize, location.state]);

  useEffect(() => {
    if (searchTerm === '') {
      fetchLocais();
    }
  }, [searchTerm]);

  const fetchLocais = () => {
    getLocais(pageNumber, pageSize)
      .then(response => setLocais(response.data))
      .catch(error => console.error(error));
  };

  const fetchSearchedLocais = () => {
    searchLocais(searchTerm, pageNumber, pageSize)
      .then(response => setLocais(response.data))
      .catch(error => console.error(error));
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  const totalPages = Math.ceil(locais.length / pageSize);

  const handleMenuToggle = (index) => {
    setMenuOpen(menuOpen === index ? null : index);
  };

  const handleEdit = (id) => {
    navigate(`/edit-local/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteLocal(id);
      setLocais(locais.filter(local => local.id !== id));
      setNotification({ message: 'Local excluído com sucesso', type: 'success' });
    } catch (error) {
      setNotification({ message: 'Erro ao excluir o local', type: 'error' });
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchSearchedLocais();
  };

  return (
    <div>
      <Header />
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="locais-container">
        <nav className="breadcrumb">
          <Link to="/">Home</Link> / <span>Locais</span>
        </nav>
        <h2>Locais</h2>
        <p>Confira a lista de todos os locais cadastrados</p>
        <div className="content-wrapper">
          <div className="search-add-section">
            <div className="search-input-container">
              <FaSearch className="search-icon" />
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Pesquise por nome do local"
                  className="search-input"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </form>
            </div>
            <Link to="/add-local" className="add-button">Adicionar local</Link>
          </div>
          {locais.length > 0 ? (
            <div className="table-container">
              <table className="locais-table">
                <thead>
                  <tr>
                    <th>Nome do Local</th>
                    <th>Endereço</th>
                    <th>Cidade & Estado</th>
                    <th>Portões cadastrados</th>
                    <th>Atualização</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {locais.map((local, index) => (
                    <tr key={local.id}>
                      <td>{local.nomeLocal}</td>
                      <td>{local.endereco.enderecoCompleto}</td>
                      <td>{local.endereco.cidade}, {local.endereco.estado}</td>
                      <td>{local.entradas && local.entradas.map(entrada => entrada.nome).join(', ')}</td>
                      <td>{new Date(local.dataAtualizacao).toLocaleDateString()}</td>
                      <td>
                        <div className="actions-menu">
                          <FaEllipsisV className="actions-icon" onClick={() => handleMenuToggle(index)} />
                          {menuOpen === index && (
                            <div className="actions-dropdown">
                              <button onClick={() => handleEdit(local.id)}>Editar</button>
                              <button onClick={() => handleDelete(local.id)}>Apagar</button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>Nenhum local encontrado.</p>
          )}
          {totalPages > 1 && (
            <div className="pagination">
              {[...Array(totalPages).keys()].map(page => (
                <button
                  key={page}
                  onClick={() => setPageNumber(page + 1)}
                  className={pageNumber === page + 1 ? 'active' : ''}
                >
                  {page + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Locais;