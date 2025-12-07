import React, { useState, useEffect, useId } from 'react';

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Lista de países en español (para el datalist/autocompletar)
const COUNTRIES = [
  "Afganistán","Albania","Argelia","Andorra","Angola","Antigua y Barbuda","Argentina","Armenia","Australia","Austria",
  "Azerbaiyán","Bahamas","Baréin","Bangladés","Barbados","Bielorrusia","Bélgica","Belice","Benín","Bután",
  "Bolivia","Bosnia y Herzegovina","Botsuana","Brasil","Brunéi","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Camboya",
  "Camerún","Canadá","República Centroafricana","Chad","Chile","China","Colombia","Comoras","República del Congo","Costa Rica",
  "Costa de Marfil","Croacia","Cuba","Chipre","Chequia","República Democrática del Congo","Dinamarca","Yibuti","Dominica","República Dominicana",
  "Ecuador","Egipto","El Salvador","Guinea Ecuatorial","Eritrea","Estonia","Esuatini","Etiopía","Fiyi","Finlandia",
  "Francia","Gabón","Gambia","Georgia","Alemania","Ghana","Grecia","Granada","Guatemala","Guinea",
  "Guinea-Bisáu","Guyana","Haití","Honduras","Hungría","Islandia","India","Indonesia","Irán","Iraq",
  "Irlanda","Israel","Italia","Jamaica","Japón","Jordania","Kazajistán","Kenia","Kiribati","Kuwait",
  "Kirguistán","Laos","Letonia","Líbano","Lesoto","Liberia","Libia","Liechtenstein","Lituania","Luxemburgo",
  "Madagascar","Malaui","Malasia","Maldivas","Malí","Malta","Islas Marshall","Mauritania","Mauricio","México",
  "Micronesia","Moldavia","Mónaco","Mongolia","Montenegro","Marruecos","Mozambique","Birmania","Namibia","Nauru",
  "Nepal","Países Bajos","Nueva Zelanda","Nicaragua","Níger","Nigeria","Corea del Norte","Macedonia del Norte","Noruega","Omán",
  "Pakistán","Palaos","Panamá","Papúa Nueva Guinea","Paraguay","Perú","Filipinas","Polonia","Portugal","Catar",
  "Rumania","Rusia","Ruanda","San Cristóbal y Nieves","Santa Lucía","San Vicente y las Granadinas","Samoa","San Marino","Santo Tomé y Príncipe","Arabia Saudita",
  "Senegal","Serbia","Seychelles","Sierra Leona","Singapur","Eslovaquia","Eslovenia","Islas Salomón","Somalia","Sudáfrica",
  "Corea del Sur","Sudán del Sur","España","Sri Lanka","Sudán","Surinam","Suecia","Suiza","Siria","Tayikistán",
  "Tanzania","Tailandia","Timor-Leste","Togo","Tonga","Trinidad y Tobago","Túnez","Turquía","Turkmenistán","Tuvalu",
  "Uganda","Ucrania","Emiratos Árabes Unidos","Reino Unido","Estados Unidos","Uruguay","Uzbekistán","Vanuatu","Ciudad del Vaticano","Venezuela",
  "Vietnam","Yemen","Zambia","Zimbabue"
];

export default function ProductForm({ onSubmit, initial = null, onCancel }) {
  const uid = useId();
  const nombreId = `nombre-${uid}`;
  const precioId = `precio-${uid}`;
  const paisId = `pais-${uid}`;
  const datalistId = `countries-${uid}`;
  const fileInputId = `archivoImagen-${uid}`;
  const [nombre, setNombre] = useState(initial ? initial.nombre : '');
  const [precio, setPrecio] = useState(initial ? initial.precio : '');
  const [pais, setPais] = useState(initial ? initial.pais : '');
  const [imagenPreview, setImagenPreview] = useState(initial ? initial.imagen : null);
  const [file, setFile] = useState(null);
  const [objectUrl, setObjectUrl] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!nombre || !precio || !pais) return alert('Completá todos los campos');
  // Validar que el precio sea numérico y no negativo
    const parsedPrecio = Number(precio);
    if (!isFinite(parsedPrecio) || parsedPrecio < 0) return alert('Ingresá un precio válido');

    let imagen = imagenPreview;
    // Si hay un archivo seleccionado, convertirlo a data URL.
    // Si no hay `file` pero la preview es un blob URL (p. ej. cuando el input perdió el File),
    // intentamos recuperar el blob desde la URL y convertirlo también.
    if (file) {
      try {
        imagen = await fileToDataUrl(file);
      } catch (err) {
        console.error(err);
      }
    } else if (imagenPreview && imagenPreview.startsWith('blob:')) {
      try {
        const resp = await fetch(imagenPreview);
        const blob = await resp.blob();
        imagen = await fileToDataUrl(blob);
      } catch (err) {
        console.error('No pude convertir blob preview a data URL', err);
      }
    }

    onSubmit({ nombre, precio: Number(precio), pais, imagen });
    // Reiniciar campos sólo cuando estamos creando (no al editar)
    if (!initial) {
      setNombre(''); setPrecio(''); setPais(''); setImagenPreview(null); setFile(null);
      // revocar cualquier objectURL creado
      if (objectUrl) {
        try { URL.revokeObjectURL(objectUrl); } catch (e) {}
        setObjectUrl(null);
      }
    }
  }

  function handleFileChange(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    setFile(f);
    const url = URL.createObjectURL(f);
    // revoke previous objectUrl if any
    if (objectUrl && objectUrl !== url) {
      try { URL.revokeObjectURL(objectUrl); } catch (e) { /* ignore */ }
    }
    setObjectUrl(url);
    setImagenPreview(url);
  }

  // cleanup on unmount: revoke any object URL we created
  useEffect(() => {
    return () => {
      if (objectUrl) {
        try { URL.revokeObjectURL(objectUrl); } catch (e) {}
      }
    };
  }, [objectUrl]);

  return (
    <form id="formularioProducto" className="mb-4 product-form-card" onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="product-form-row">
        <div className="product-form-col flex-1">
          <input type="text" id={nombreId} className="form-control" placeholder="Nombre del producto" required value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div className="product-form-col w-120">
          <input type="number" id={precioId} className="form-control" placeholder="Precio" required value={precio} min="0" step="0.01" onChange={(e) => setPrecio(e.target.value)} />
        </div>
        <div className="product-form-col w-160">
          {/* Usar datalist para que el usuario pueda escribir y recibir sugerencias de países */}
          <input list={datalistId} type="text" id={paisId} className="form-control" placeholder="Origen (País)" required value={pais} onChange={(e) => setPais(e.target.value)} aria-label="Origen (País)" />
          <datalist id={datalistId}>
            {COUNTRIES.map((c) => (<option key={c} value={c} />))}
          </datalist>
        </div>
        <div className="product-form-col w-180 file-input-col">
          <label className="file-upload-label" htmlFor={fileInputId}>
            <input type="file" id={fileInputId} className="form-control-file visually-hidden" accept="image/*" onChange={handleFileChange} />
            <span className="file-upload-text">{file ? file.name : 'Seleccionar imagen'}</span>
          </label>
        </div>
        <div className="product-form-actions">
          <button type="submit" className="btn btn-success">{initial ? 'Guardar' : 'Agregar producto'}</button>
          {initial && <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>}
        </div>
      </div>

      {imagenPreview && (
        <div className="image-preview">
          <img src={imagenPreview} alt="preview" />
        </div>
      )}
    </form>
  );
}
