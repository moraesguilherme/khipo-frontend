import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { addEvento, getLocais } from '../services/api';
import { Form, Button } from 'react-bootstrap';
import Notification from '../components/Notification';
import './AddEvento.css';

const AddEvento = () => {
  const [nomeEvento, setNomeEvento] = useState('');
  const [tipo, setTipo] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [localId, setLocalId] = useState('');
  const [locais, setLocais] = useState([]);
  const [emailContato, setEmailContato] = useState('');
  const [telefoneContato, setTelefoneContato] = useState('');
  const [notification, setNotification] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchLocais();
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  const fetchLocais = async () => {
    try {
      const response = await getLocais();
      setLocais(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!nomeEvento) newErrors.nomeEvento = 'Campo vazio';
    if (!tipo) newErrors.tipo = 'Campo vazio';
    if (!data) newErrors.data = 'Campo vazio';
    if (!horario) newErrors.horario = 'Campo vazio';
    if (!localId) newErrors.localId = 'Campo vazio';
    if (!emailContato) newErrors.emailContato = 'Campo vazio';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setNotification({ message: 'Erro ao adicionar o evento', type: 'error' });
      return;
    }

    const novoEvento = {
      nome: nomeEvento,
      tipo,
      data,
      horario,
      localId: parseInt(localId),
      emailContato,
      telefoneContato,
    };
    try {
      await addEvento(novoEvento);
      localStorage.setItem('notification', JSON.stringify({ message: 'Um novo evento foi adicionado', type: 'success' }));
      navigate('/eventos');
    } catch (error) {
      console.error(error);
      setNotification({ message: 'Erro ao adicionar o evento', type: 'error' });
    }
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
      <div className="add-evento-container">
        <div className="breadcrumb">
          <Link to="/">Home </Link> / <Link to="/eventos"> Eventos </Link> / Adicionar novo evento
        </div>
        <h2>Adicionar novo Evento</h2>
        <p>*Campos obrigatórios</p>
        <div className="content-wrapper">
          <Form onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>Informações básicas</h3>
              <div className="form-row">
                <Form.Group className="form-group">
                  <Form.Label>Nome do evento*</Form.Label>
                  <Form.Control
                    type="text"
                    value={nomeEvento}
                    onChange={(e) => setNomeEvento(e.target.value)}
                    placeholder="Informe o nome do evento"
                    isInvalid={!!errors.nomeEvento}
                  />
                  <Form.Control.Feedback type="invalid">{errors.nomeEvento}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label>Selecione um tipo*</Form.Label>
                  <Form.Control
                    as="select"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    isInvalid={!!errors.tipo}
                    required
                  >
                    <option value="">Selecione um tipo</option>
                    <option value="Show">Show</option>
                    <option value="Conferência">Conferência</option>
                    <option value="Esporte">Esporte</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">{errors.tipo}</Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="form-row">
                <Form.Group className="form-group">
                  <Form.Label>Data do evento*</Form.Label>
                  <Form.Control
                    type="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    isInvalid={!!errors.data}
                    required
                  />
                  <Form.Control.Feedback type="invalid">{errors.data}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label>Horário do evento*</Form.Label>
                  <Form.Control
                    type="time"
                    value={horario}
                    onChange={(e) => setHorario(e.target.value)}
                    isInvalid={!!errors.horario}
                    required
                  />
                  <Form.Control.Feedback type="invalid">{errors.horario}</Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="form-row register-local-group">
                <Form.Group className="form-group">
                  <Form.Label>Selecione um Local*</Form.Label>
                  <Form.Control
                    as="select"
                    value={localId}
                    onChange={(e) => setLocalId(e.target.value)}
                    isInvalid={!!errors.localId}
                    required
                  >
                    <option value="">Selecione um local</option>
                    {locais.map(local => (
                      <option key={local.id} value={local.id}>{local.nomeLocal}</option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">{errors.localId}</Form.Control.Feedback>
                  <Button variant="link" className="register-local-link" onClick={() => navigate('/add-local')}>Cadastrar local</Button>
                </Form.Group>
              </div>
            </div>
            <hr></hr>
            <div className="form-section">
              <h3>Contato</h3>
              <div className="form-row">
                <Form.Group className="form-group">
                  <Form.Label>E-mail*</Form.Label>
                  <Form.Control
                    type="email"
                    value={emailContato}
                    onChange={(e) => setEmailContato(e.target.value)}
                    placeholder="Informe um e-mail"
                    isInvalid={!!errors.emailContato}
                    required
                  />
                  <Form.Control.Feedback type="invalid">{errors.emailContato}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label>Telefone</Form.Label>
                  <Form.Control
                    type="tel"
                    value={telefoneContato}
                    onChange={(e) => setTelefoneContato(e.target.value)}
                    placeholder="Informe um telefone"
                  />
                </Form.Group>
              </div>
            </div>
            <hr></hr>
            <div className="form-buttons">
              <Button variant="secondary" className="mr-2 btn-secondary" onClick={() => navigate('/eventos')}>Cancelar</Button>
              <Button variant="primary" className="btn-primary" type="submit">Cadastrar</Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddEvento;