import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Open Sans', sans-serif;
    background-color: #FCFCFC;
    color: #333B49;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 32px;
    background-color: #333B49;
    color: #EBF0F9;
  }

  .header .logo a {
    text-decoration: none;
    color: #EBF0F9;
    font-size: 24px;
  }

  nav ul {
    display: flex;
    list-style: none;
  }

  nav ul li {
    margin: 0 16px;
  }

  nav ul li a {
    text-decoration: none;
    color: #EBF0F9;
  }

  .user-info {
    font-size: 16px;
  }

  .home-container {
    padding: 32px;
  }

  .intro h2 {
    font-size: 48px;
    margin-bottom: 16px;
  }

  .intro p {
    font-size: 24px;
    margin-bottom: 32px;
  }

  .cards {
    display: flex;
    justify-content: space-between;
  }

  .cards .cards-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .card {
    padding: 16px;
    border: 1px solid #999AA1;
    border-radius: 8px;
    background-color: #FFFFFF;
  }

  .card h3 {
    font-size: 24px;
    margin-bottom: 8px;
  }

  .card p {
    font-size: 16px;
    margin-bottom: 4px;
  }
`;

export default GlobalStyles;