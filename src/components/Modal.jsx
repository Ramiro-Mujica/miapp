import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

// Pequeño wrapper para renderizar modales en un portal sobre el body.
// Evita que el modal quede sujeto al flujo del contenedor padre y bloquea el scroll de fondo.
export default function Modal({ children, onClose, ariaLabel }) {
    useEffect(() => {
        const prevOverflow = document.body.style.overflow;
        // Evitar scroll de fondo cuando el modal está abierto
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = prevOverflow; };
    }, []);

    const node = (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={ariaLabel || 'Modal'}>
        {children}
        </div>
    );

    return ReactDOM.createPortal(node, document.body);
}
