import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { getLocais, getEventos } from '../services/api';
import LocalCard from '../components/LocalCard';
import EventoCard from '../components/EventoCard';
import Section from '../components/Section';
import './Home.css';
import { Button } from '@material-ui/core';
import { Room as RoomIcon, Event as EventIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const Home = () => {
  const [locais, setLocais] = useState([]);
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    fetchLocais();
    fetchEventos();
  }, []);

  const fetchLocais = async () => {
    try {
      const response = await getLocais();
      if (Array.isArray(response.data)) {
        setLocais(response.data);
      } else {
        setLocais([]);
      }
    } catch (error) {
      console.error(error);
      setLocais([]);
    }
  };

  const fetchEventos = async () => {
    try {
      const response = await getEventos();
      if (Array.isArray(response.data)) {
        setEventos(response.data);
      } else {
        setEventos([]);
      }
    } catch (error) {
      console.error(error);
      setEventos([]);
    }
  };

  return (
    <div className="home">
      <Header />
      <main className="home-container">
        <div className="greeting-section">
          <h2>Olá, Mariana</h2>
          <p>Confira todos os seus eventos e locais em um só lugar!</p>
        </div>
        <div className="buttons-section">
          <div className="button-local">
            <div className="button-content">
              <h2><RoomIcon className="icon" /><span>Locais</span></h2>
              <p>Confira todos os locais cadastrados!</p>
            </div>
            <Link to="/locais">
              <Button className="custom-button" variant="contained">Conferir locais</Button>
            </Link>
          </div>
          <div className="button-evento">
            <div className="button-content">
              <h2><EventIcon className="icon" /><span>Eventos</span></h2>
              <p>Confira todos os eventos cadastrados!</p>
            </div>
            <Link to="/eventos">
              <Button className="custom-button" variant="contained">Conferir eventos</Button>
            </Link>
          </div>
        </div>
        <div className="section-content">
          <Section title="Últimos locais adicionados" linkText="Ver todos" linkHref="/locais">
            <div className="card-container">
              {Array.isArray(locais) && locais.map(local => (
                <LocalCard key={local.id} local={local} />
              ))}
            </div>
          </Section>
          <Section title="Últimos eventos adicionados" linkText="Ver todos" linkHref="/eventos">
            <div className="card-container">
              {Array.isArray(eventos) && eventos.map(evento => (
                <EventoCard key={evento.id} evento={evento} />
              ))}
            </div>
          </Section>
        </div>
      </main>
    </div>
  );
};

export default Home;