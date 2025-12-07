import React from 'react';

export default function ProductCard({ producto, onAdd, onEdit, onDelete }) {
  // Determina la URL de la imagen para mostrar en la tarjeta.
  // - Si es data URL (base64) o URL absoluta se usa tal cual.
  // - Si es una ruta relativa tipo './images/xxx.jpg' se transforma a '/images/xxx.jpg' para servir desde public.
  const getImageSrc = (img) => {
    if (!img) return '/images/placeholder.png';
    if (/^data:/.test(img) || /^https?:/.test(img) || img.startsWith('/')) return img;
    // manejar rutas relativas como ./images/xxx.jpg
    const parts = img.split('/');
    const name = parts[parts.length - 1];
    return `/images/${name}`;
  };

  return (
    <div className="col-md-4 mb-4" key={producto.id}>
      <div className="card h-100">
        <img src={getImageSrc(producto.imagen)} className="card-img-top" alt={producto.nombre} />
        <div className="card-body">
          <h5 className="card-title">{producto.nombre}</h5>
          <p className="card-text"><strong>Precio:</strong> ${producto.precio}</p>
          <p className="card-text"><strong>Origen:</strong> {producto.pais}</p>
        </div>
        <div className="card-footer">
          <button className="btn btn-success" onClick={() => onAdd(producto.id)}>Agregar</button>
          <button className="btn btn-warning" onClick={() => onEdit(producto.id)}>Editar</button>
          <button className="btn btn-danger" onClick={() => onDelete(producto.id)}>Eliminar</button>
        </div>
      </div>
    </div>
  );
}
