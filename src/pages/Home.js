import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import CardContainer from '../components/CardContainer';
import Section from '../components/Section';
import Button from '../components/Button';
import styled from 'styled-components';

const HomeWrapper = styled.div`
  background: #333B49;
  min-height: 100vh;
  padding: 20px;
`;

const Home = () => (
  <HomeWrapper>
    <Header />
    <h2 style={{ color: 'white' }}>Olá, Mariana</h2>
    <p style={{ color: '#BABBBF' }}>Confira todos os seus eventos e locais em um só lugar!</p>

    <Section title="Últimos locais adicionados">
      <CardContainer>
        <Card title="Morumbis" text="Avenida Francisco Matarazzo, 1705 morumbis@local.com" />
        <Card title="Allianz Parque" text="Avenida Francisco Matarazzo, 1705 allianz@local.com" />
        <Card title="Neo Quimica Arena" text="Avenida Francisco Matarazzo, 1705 neoqimica@local.com" />
      </CardContainer>
    </Section>

    <Section title="Últimos eventos adicionados">
      <CardContainer>
        <Card title="Final Copa América" text="Futebol Morumbis" />
        <Card title="Semi Final Copa América" text="Futebol Morumbis" />
        <Card title="Love on tour - Harry Styles" text="Show Morumbis" />
      </CardContainer>
    </Section>
  </HomeWrapper>
);

export default Home;