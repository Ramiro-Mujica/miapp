import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Si querés medir rendimiento en la app, pasá una función
// para registrar resultados (por ejemplo: reportWebVitals(console.log))
// o enviarlos a un endpoint de analytics. Más info: https://bit.ly/CRA-vitals
reportWebVitals();

// Colocar imagen de fondo desde la carpeta public/images para que se vea detrás de todo
try {
  // Aplicar la imagen como mosaico (fragmentada) para evitar pixelado grande
  // y mantener un degradado semitransparente encima para la legibilidad.
  document.body.style.backgroundImage = "url('/images/nuecesita.jpg'), linear-gradient(rgba(246,251,247,0.32), rgba(232,245,232,0.32))";
  // Reducimos el tamaño de la imagen y la repetimos (tile) para dar un efecto fragmentado.
  document.body.style.backgroundSize = '280px 280px, cover';
  document.body.style.backgroundPosition = 'center, center';
  document.body.style.backgroundRepeat = 'repeat, no-repeat';
  // Mezcla suave para integrar degradado y foto
  document.body.style.backgroundBlendMode = 'overlay, normal';
} catch (e) {
  // ignore (SSR or environments without DOM)
}
