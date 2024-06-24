import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { getLocalById, updateLocal } from '../services/api';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './AddLocal.css';

const EditLocal = () => {
  const [nomeLocal, setNomeLocal] = useState('');
  const [apelido, setApelido] = useState('');
  const [tipo, setTipo] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');
  const [enderecoCompleto, setEnderecoCompleto] = useState('');
  const [complemento, setComplemento] = useState('');
  const [emailContato, setEmailContato] = useState('');
  const [telefoneContato, setTelefoneContato] = useState('');
  const [entradas, setEntradas] = useState([]);
  const [catracas, setCatracas] = useState([]);
  const [enderecoId, setEnderecoId] = useState(null); // Para armazenar o ID do endereço
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getLocalById(id)
      .then(response => {
        const local = response.data;
        setNomeLocal(local.nomeLocal);
        setApelido(local.apelido);
        setTipo(local.tipo);
        setCnpj(local.cnpj);
        setCidade(local.endereco.cidade);
        setEstado(local.endereco.estado);
        setCep(local.endereco.cep);
        setEnderecoCompleto(local.endereco.enderecoCompleto);
        setComplemento(local.endereco.complemento);
        setEmailContato(local.emailContato);
        setTelefoneContato(local.telefoneContato);
        setEntradas(local.entradas);
        setCatracas(local.catracas);
        setEnderecoId(local.endereco.id); // Definir o ID do endereço
      })
      .catch(error => console.error(error));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedLocal = {
      id, // Inclui o ID do local na atualização
      nomeLocal, apelido, tipo, cnpj, emailContato, telefoneContato,
      dataAtualizacao: new Date().toISOString(),
      endereco: { id: enderecoId, localId: id, cidade, estado, cep, enderecoCompleto, complemento },
      entradas: entradas.map((entrada) => ({ id: entrada.id, nome: entrada.nome, localId: id })),
      catracas: catracas.map((catraca) => ({ id: catraca.id, nome: catraca.nome, localId: id }))
    };
    try {
      await updateLocal(id, updatedLocal);
      navigate('/locais');
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddEntrada = () => {
    setEntradas([...entradas, { id: null, nome: '', localId: id }]);
  };

  const handleAddCatraca = () => {
    setCatracas([...catracas, { id: null, nome: '', localId: id }]);
  };

  const handleRemoveEntrada = (index) => {
    const newEntradas = entradas.filter((_, i) => i !== index);
    setEntradas(newEntradas);
  };

  const handleRemoveCatraca = (index) => {
    const newCatracas = catracas.filter((_, i) => i !== index);
    setCatracas(newCatracas);
  };

  const handleEntradaChange = (index, value) => {
    const newEntradas = [...entradas];
    newEntradas[index].nome = value;
    setEntradas(newEntradas);
  };

  const handleCatracaChange = (index, value) => {
    const newCatracas = [...catracas];
    newCatracas[index].nome = value;
    setCatracas(newCatracas);
  };

  return (
    <div>
      <Header />
      <div className="add-local-container">
        <div className="breadcrumb">
          <Link to="/">Home </Link> / <Link to="/locais"> Locais </Link> / Editar local
        </div>
        <h2>Editar local</h2>
        <p>*Campos obrigatórios</p>
        <div className="content-wrapper">
          <Form onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>Informações básicas</h3>
              <div className="form-row">
                <Form.Group className="form-group">
                  <Form.Label>Nome do local*</Form.Label>
                  <Form.Control type="text" value={nomeLocal} onChange={(e) => setNomeLocal(e.target.value)} placeholder="Informe o nome do local" required />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label>Apelido</Form.Label>
                  <Form.Control type="text" value={apelido} onChange={(e) => setApelido(e.target.value)} placeholder="Informe um apelido (caso exista)" />
                </Form.Group>
              </div>
              <div className="form-row">
                <Form.Group className="form-group">
                  <Form.Label>Selecione um tipo*</Form.Label>
                  <Form.Control type="text" value={tipo} onChange={(e) => setTipo(e.target.value)} placeholder="Selecione um tipo" required />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label>CNPJ</Form.Label>
                  <Form.Control type="text" value={cnpj} onChange={(e) => setCnpj(e.target.value)} placeholder="Informe o CNPJ" />
                </Form.Group>
              </div>
            </div>
            <hr></hr>
            <div className="form-section">
              <h3>Localização</h3>
              <div className="form-row">
                <Form.Group className="form-group">
                  <Form.Label>Cidade*</Form.Label>
                  <Form.Control type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} placeholder="Informe a Cidade" required />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label>Estado*</Form.Label>
                  <Form.Control type="text" value={estado} onChange={(e) => setEstado(e.target.value)} placeholder="Selecione um estado" required />
                </Form.Group>
              </div>
              <div className="form-row">
                <Form.Group className="form-group">
                  <Form.Label>CEP*</Form.Label>
                  <Form.Control type="text" value={cep} onChange={(e) => setCep(e.target.value)} placeholder="Informe o CEP" required />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label>Endereço*</Form.Label>
                  <Form.Control type="text" value={enderecoCompleto} onChange={(e) => setEnderecoCompleto(e.target.value)} placeholder="Informe o Endereço" required />
                </Form.Group>
              </div>
              <Form.Group className="form-group">
                <Form.Label>Complemento</Form.Label>
                <Form.Control type="text" value={complemento} onChange={(e) => setComplemento(e.target.value)} placeholder="Informe o complemento" />
              </Form.Group>
            </div>
            <hr></hr>
            <div className="form-section">
              <h3>Contato</h3>
              <div className="form-row">
                <Form.Group className="form-group">
                  <Form.Label>E-mail*</Form.Label>
                  <Form.Control type="email" value={emailContato} onChange={(e) => setEmailContato(e.target.value)} placeholder="Informe um e-mail" required />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label>Telefone</Form.Label>
                  <Form.Control type="tel" value={telefoneContato} onChange={(e) => setTelefoneContato(e.target.value)} placeholder="Informe um telefone" />
                </Form.Group>
              </div>
            </div>
            <hr></hr>
            <div className="form-section">
              <h3>Cadastro de entradas e catracas</h3>
              <div className="form-row">
                <Form.Group className="form-group entradas">
                  <Form.Label>Cadastre as entradas</Form.Label>
                  <InputGroup>
                    <Form.Control type="text" value={entradas.map(entrada => entrada.nome).join(', ')} onChange={(e) => setEntradas(e.target.value.split(', ').map((nome, index) => ({ id: entradas[index] ? entradas[index].id : null, nome, localId: id })))} placeholder="Insira as entradas" />
                    <Button variant="outline-primary" onClick={handleAddEntrada}>+</Button>
                  </InputGroup>
                  <div className="tags">
                    {entradas.map((entrada, index) => (
                      <span key={index} className="tag">
                        {entrada.nome}
                        <button type="button" onClick={() => handleRemoveEntrada(index)}>x</button>
                      </span>
                    ))}
                  </div>
                </Form.Group>
                <Form.Group className="form-group catracas">
                  <Form.Label>Cadastre as catracas</Form.Label>
                  <InputGroup>
                    <Form.Control type="text" value={catracas.map(catraca => catraca.nome).join(', ')} onChange={(e) => setCatracas(e.target.value.split(', ').map((nome, index) => ({ id: catracas[index] ? catracas[index].id : null, nome, localId: id })))} placeholder="Insira as catracas" />
                    <Button variant="outline-primary" onClick={handleAddCatraca}>+</Button>
                  </InputGroup>
                  <div className="tags">
                    {catracas.map((catraca, index) => (
                      <span key={index} className="tag">
                        {catraca.nome}
                        <button type="button" onClick={() => handleRemoveCatraca(index)}>x</button>
                      </span>
                    ))}
                  </div>
                </Form.Group>
              </div>
            </div>
            <hr />
            <div className="form-buttons">
              <Button variant="secondary" className="mr-2 btn-secondary" onClick={() => navigate('/locais')}>Cancelar</Button>
              <Button variant="primary" className="btn-primary" type="submit">Salvar</Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditLocal;