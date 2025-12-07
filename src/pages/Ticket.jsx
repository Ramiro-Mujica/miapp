import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarritoContext } from '../context/CarritoContext';

function Ticket() {
  const { carrito, setCarrito } = useContext(CarritoContext);

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [error, setError] = useState('');
  const [confirmacion, setConfirmacion] = useState(false);

  const navigate = useNavigate();

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  function imprimirTicket() {
    if (!nombre || !email) {
      setError('Por favor completá tu nombre y correo electrónico.');
      return;
    }

    setError('');
    window.print();

    setTimeout(() => {
      setCarrito([]);
      setConfirmacion(true);
    }, 1000);
  }

  return (
    <div className="ticket-container">
      <div className="ticket-header">
        <h2>Ticket de compra</h2>
        <p>Gracias por tu compra. A continuación, los detalles:</p>
      </div>

      <div className="ticket-info">
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Tu nombre"
        />

        <label>Correo electrónico:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ejemplo@mail.com"
        />

        <label>Observaciones:</label>
        <textarea
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
          placeholder="Comentarios, aclaraciones o pedidos especiales"
          rows={3}
          className="ticket-textarea"
        />

        {error && <p className="error-text">{error}</p>}
        {confirmacion && (
          <p className="confirm-text">
            ✅ ¡Gracias, {nombre}! Tu compra fue registrada.
          </p>
        )}
      </div>

      <table className="ticket-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {carrito.map(item => (
            <tr key={item.id}>
              <td>{item.nombre}</td>
              <td>{item.cantidad}</td>
              <td>${item.precio * item.cantidad}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="ticket-total">
        Total: ${total}
      </div>

      <button className="btn btn-print" onClick={imprimirTicket}>
        Imprimir ticket
      </button>

      <div className="ticket-footer">
        <p>¡Esperamos que disfrutes tu compra!</p>
        <button className="btn btn-back" onClick={() => navigate('/') }>
          Volver al inicio
        </button>
      </div>
    </div>
  );
}

export default Ticket;