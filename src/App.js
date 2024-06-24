// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Locais from './pages/Locais';
import AddLocal from './pages/AddLocal';
import EditLocal from './pages/EditLocal';
import Eventos from './pages/Eventos';
import AddEvento from './pages/AddEvento';
import EditEvento from './pages/EditEvento';
import GlobalStyles from './styles/GlobalStyles';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/locais" element={<Locais />} />
        <Route path="/add-local" element={<AddLocal />} />
        <Route path="/edit-local/:id" element={<EditLocal />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/add-evento" element={<AddEvento />} />
        <Route path="/edit-evento/:id" element={<EditEvento />} />
      </Routes>
    </Router>
  );
};

export default App;