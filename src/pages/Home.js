import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { getLocais, getEventos } from '../services/api';
import LocalCard from '../components/LocalCard';
import EventoCard from '../components/EventoCard';
import Section from '../components/Section';
import './Home.css';
import { Button } from '@material-ui/core';
import { Room as RoomIcon, Event as EventIcon } from '@material-ui/icons';

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
      setLocais(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEventos = async () => {
    try {
      const response = await getEventos();
      setEventos(response.data);
    } catch (error) {
      console.error(error);
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
            <RoomIcon className="icon" />
            <div className="button-content">
              <h3>Locais</h3>
              <p>Confira todos os locais cadastrados!</p>
            </div>
            <Button variant="contained" color="primary">Conferir locais</Button>
          </div>
          <div className="button-evento">
            <EventIcon className="icon" />
            <div className="button-content">
              <h3>Eventos</h3>
              <p>Confira todos os eventos cadastrados!</p>
            </div>
            <Button variant="contained" color="primary">Conferir eventos</Button>
          </div>
        </div>
        <div className="section-content">
          <Section title="Últimos locais adicionados" linkText="Ver todos" linkHref="#">
            <div className="card-container">
              {locais.map(local => (
                <LocalCard key={local.id} local={local} />
              ))}
            </div>
          </Section>
          <Section title="Últimos eventos adicionados" linkText="Ver todos" linkHref="#">
            <div className="card-container">
              {eventos.map(evento => (
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