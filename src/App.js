import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListaProductos from './components/ListaProductos';
import Ticket from './pages/Ticket';
import { CarritoProvider } from './context/CarritoContext';
import './css/styles.css';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <CarritoProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ListaProductos />} />
          <Route path="/ticket" element={<Ticket />} />
        </Routes>
        <Footer />
      </Router>
    </CarritoProvider>
  );
}

export default App;