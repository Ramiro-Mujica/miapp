import { createContext, useState, useEffect } from 'react';

// Contexto para el carrito de compras
export const CarritoContext = createContext();

// Proveedor que mantiene el estado del carrito y lo persiste en localStorage.
export function CarritoProvider({ children }) {
    const [carrito, setCarrito] = useState(() => {
        // Cargar carrito desde localStorage si existe, si no iniciar vacío
        const guardado = localStorage.getItem('carrito');
        return guardado ? JSON.parse(guardado) : [];
    });

    // Persiste el carrito cuando cambia
    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);

    return (
        <CarritoContext.Provider value={{ carrito, setCarrito }}>
        {children}
        </CarritoContext.Provider>
    );
}