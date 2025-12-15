import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  const linkClass = ({ isActive }) =>
    `nav-link ${isActive ? 'active' : ''}`;

  return (
    <nav className="main-nav" aria-label="Navegación principal">
      <div className="main-nav-inner">
        <NavLink to="/" className={linkClass} end>
          Inicio
        </NavLink>
        <NavLink to="/nosotros" className={linkClass}>
          Nosotros
        </NavLink>
      </div>
    </nav>
  );
}
