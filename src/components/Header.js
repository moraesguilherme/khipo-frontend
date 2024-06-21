import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="header">
    <div className="logo">
      <Link to="/">OnEntrée</Link>
    </div>
    <nav>
      <ul>
        <li><Link to="/locais">Home</Link></li>
        <li><Link to="/locais">Locais</Link></li>
        <li><Link to="/eventos">Eventos</Link></li>
      </ul>
    </nav>
    <div className="user-info">
      <span>Olá, Nome</span>
    </div>
  </header>
);

export default Header;
