import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaSearch, FaEllipsisV } from 'react-icons/fa';
import Header from '../components/Header';
import { getEventos, deleteEvento, searchEventos } from '../services/api';
import Notification from '../components/Notification';
import './Eventos.css';

const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
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

    fetchEventos();
  }, [pageNumber, pageSize, location.state]);

  useEffect(() => {
    if (searchTerm === '') {
      fetchEventos();
    } else {
      fetchSearchedEventos();
    }
  }, [searchTerm, pageNumber, pageSize]);

  const fetchEventos = () => {
    getEventos(pageNumber, pageSize)
      .then(response => {
        const data = response.data || [];
        setEventos(data);
        setTotalCount(data.length);
      })
      .catch(error => console.error(error));
  };

  const fetchSearchedEventos = () => {
    searchEventos(searchTerm, pageNumber, pageSize)
      .then(response => {
        const data = response.data || [];
        setEventos(data);
        setTotalCount(data.length);
      })
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

  const totalPages = Math.ceil(totalCount / pageSize);

  const handleMenuToggle = (index) => {
    setMenuOpen(menuOpen === index ? null : index);
  };

  const handleEdit = (id) => {
    navigate(`/edit-evento/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteEvento(id);
      fetchEventos();
      setNotification({ message: 'Evento excluído com sucesso', type: 'success' });
    } catch (error) {
      setNotification({ message: 'Erro ao excluir o evento', type: 'error' });
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchSearchedEventos();
  };

  const handlePageClick = (page) => {
    setPageNumber(page + 1);
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
      <div className="eventos-container">
        <nav className="breadcrumb">
          <Link to="/">Home</Link> / <span>Eventos</span>
        </nav>
        <h2>Eventos</h2>
        <p>Confira a lista de todos os eventos cadastrados</p>
        <div className="content-wrapper">
          <div className="search-add-section">
            <div className="search-input-container">
              <FaSearch className="search-icon" />
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Pesquise por nome do evento"
                  className="search-input"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </form>
            </div>
            <Link to="/add-evento" className="add-button">Adicionar evento</Link>
          </div>
          {eventos.length > 0 ? (
            <div className="table-container">
              <table className="eventos-table">
                <thead>
                  <tr>
                    <th>Evento</th>
                    <th>Tipo</th>
                    <th>Local associado</th>
                    <th>Endereço</th>
                    <th>Portões cadastrados</th>
                    <th>Data</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {eventos.map((evento, index) => (
                    <tr key={evento.id}>
                      <td>{evento.nome}</td>
                      <td>{evento.tipo}</td>
                      <td>{evento.local.nomeLocal}</td>
                      <td>{evento.local.enderecoCompleto}</td>
                      <td>{evento.portoes.map(portao => portao.nome).join(', ')}</td>
                      <td>{new Date(evento.data).toLocaleDateString()}</td>
                      <td>
                        <div className="actions-menu">
                          <FaEllipsisV className="actions-icon" onClick={() => handleMenuToggle(index)} />
                          {menuOpen === index && (
                            <div className="actions-dropdown">
                              <button onClick={() => handleEdit(evento.id)}>Editar</button>
                              <button onClick={() => handleDelete(evento.id)}>Apagar</button>
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
            <p>Nenhum evento encontrado.</p>
          )}
          {totalPages > 1 && (
            <div className="pagination">
              {[...Array(totalPages).keys()].map(page => (
                <button
                  key={page}
                  onClick={() => handlePageClick(page)}
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

export default Eventos;