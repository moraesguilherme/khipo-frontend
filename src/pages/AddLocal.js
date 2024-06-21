import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Alterado para useNavigate
import Header from '../components/Header';
import { addLocal } from '../services/api';

const AddLocal = () => {
  const [nome, setNome] = useState('');
  const [apelido, setApelido] = useState('');
  const [tipo, setTipo] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [emailContato, setEmailContato] = useState('');
  const [telefoneContato, setTelefoneContato] = useState('');
  const [endereco, setEndereco] = useState('');
  const navigate = useNavigate(); // Alterado para useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    const novoLocal = { nome, apelido, tipo, cnpj, emailContato, telefoneContato, endereco };
    try {
      await addLocal(novoLocal);
      navigate('/locais'); // Alterado para navigate
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header />
      <h2>Adicionar Local</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome do local" required />
        <input type="text" value={apelido} onChange={(e) => setApelido(e.target.value)} placeholder="Apelido" required />
        <input type="text" value={tipo} onChange={(e) => setTipo(e.target.value)} placeholder="Tipo" required />
        <input type="text" value={cnpj} onChange={(e) => setCnpj(e.target.value)} placeholder="CNPJ" required />
        <input type="email" value={emailContato} onChange={(e) => setEmailContato(e.target.value)} placeholder="Email de contato" required />
        <input type="tel" value={telefoneContato} onChange={(e) => setTelefoneContato(e.target.value)} placeholder="Telefone de contato" required />
        <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} placeholder="Endereço" required />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default AddLocal;
