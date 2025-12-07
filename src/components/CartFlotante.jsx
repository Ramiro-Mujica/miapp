import React, { useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CarritoContext } from '../context/CarritoContext';

export default function CartFlotante() {
  const { carrito, setCarrito } = useContext(CarritoContext);
  const [open, setOpen] = useState(false);

  const total = useMemo(() => carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0), [carrito]);

  function quitarDelCarrito(id) {
    setCarrito(prev => prev.filter(item => item.id !== id));
  }

  function vaciar() {
    setCarrito([]);
  }

  const cantidadTotal = carrito.reduce((acc, p) => acc + p.cantidad, 0);

  return (
    <>
      <button
        className="cart-toggle-btn"
        aria-expanded={open}
        aria-label={`Abrir carrito, ${cantidadTotal} items`}
        onClick={() => setOpen(v => !v)}
      >
        <span className="cart-emoji">🛒</span>
        <span className="cart-label">Carrito</span>
        {cantidadTotal > 0 && <span className="cart-badge">{cantidadTotal}</span>}
      </button>

      <div className={`cart-panel ${open ? 'open' : 'hidden'}`} role="dialog" aria-hidden={!open} aria-label="Panel del carrito">
        <div className="cart-header">
          <h3>Tu carrito</h3>
          <div className="cart-header-right">
            <strong className="cart-total-amount">${total}</strong>
            <button className="btn btn-sm btn-danger" onClick={vaciar} title="Vaciar carrito">Vaciar</button>
          </div>
        </div>

        <div className="cart-content">
          {carrito.length === 0 ? (
            <p className="muted">El carrito está vacío.</p>
          ) : (
            carrito.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-left">
                  {item.imagen ? <img src={item.imagen} alt={item.nombre} /> : <div className="thumb-placeholder" />}
                  <div className="cart-item-meta">
                    <div className="cart-item-name">{item.nombre}</div>
                    <div className="cart-item-qty">Cantidad: {item.cantidad}</div>
                  </div>
                </div>
                <div className="cart-item-right">
                  <div className="cart-item-price">${item.precio * item.cantidad}</div>
                  <button className="btn btn-sm btn-danger ms-2" onClick={() => quitarDelCarrito(item.id)}>Quitar</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-actions">
          <Link to="/ticket" className="btn btn-back go-ticket" onClick={() => setOpen(false)}>Ir al ticket</Link>
        </div>
      </div>
    </>
  );
}
