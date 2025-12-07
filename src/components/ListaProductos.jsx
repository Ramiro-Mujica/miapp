import React, { useContext, useEffect, useState, useId } from 'react';
import initialProductos from '../data/products';
import { CarritoContext } from '../context/CarritoContext';
import ProductCard from './ProductCard';
import ProductForm from './ProductForm';
import Modal from './Modal';
import CartFlotante from './CartFlotante';

const STORAGE_KEY = 'miapp_productos_v1';

// Carga inicial de productos: primero intenta desde localStorage y si no existe usa los iniciales.
function loadProductos() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) return JSON.parse(raw);
    } catch (err) {
        console.warn('Error leyendo productos desde localStorage', err);
    }
    return initialProductos;
}

export default function ListaProductos() {
    // Componente que muestra el listado de productos, permite crear, editar, eliminar
    // y agregar productos al carrito. Usamos el contexto del carrito; sólo necesitamos setCarrito aquí.
    const { setCarrito } = useContext(CarritoContext);
    const [productos, setProductos] = useState(() => loadProductos());
    const [search, setSearch] = useState('');
    const uid = useId();
    const priceFilterId = `price-filter-${uid}`;
    const priceValueId = `price-value-${uid}`;
    const countryFilterId = `country-filter-${uid}`;
    const [priceFilterType, setPriceFilterType] = useState('none'); // 'none' | 'lt' | 'gt'
    const [priceFilterValue, setPriceFilterValue] = useState('');
    const [countryFilter, setCountryFilter] = useState('');
    const [editing, setEditing] = useState(null);
    const [showCreate, setShowCreate] = useState(false);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(productos));
        } catch (err) {
            console.warn('No pude guardar productos en localStorage', err);
        }
    }, [productos]);

    // Añade un producto al carrito; si ya existe incrementa la cantidad
    function agregarAlCarrito(id) {
        const producto = productos.find(p => p.id === id);
        if (!producto) return;

        setCarrito(prev => {
            const existente = prev.find(i => i.id === id);
            if (existente) {
                return prev.map(i => i.id === id ? { ...i, cantidad: i.cantidad + 1 } : i);
            }
            return [...prev, { ...producto, cantidad: 1 }];
        });
    }

    // Elimina un producto del listado (pide confirmación)
    function eliminarProducto(id) {
        if (!window.confirm('¿Eliminar producto?')) return;
        setProductos(prev => prev.filter(p => p.id !== id));
    }

    // Crea un nuevo producto asignando un id incremental
    function crearProducto(data) {
        setProductos(prev => {
            const nextId = prev.reduce((m, p) => Math.max(m, p.id), 0) + 1;
            const nuevo = { id: nextId, ...data };
            return [nuevo, ...prev];
        });
    }

    // Actualiza los datos de un producto existente
    function actualizarProducto(id, data) {
        setProductos(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
        setEditing(null);
    }

    // Inicia el modo edición cargando el producto en el formulario
    function startEdit(id) {
        const prod = productos.find(p => p.id === id);
        if (prod) setEditing(prod);
    }

    // Construir lista inicial filtrada por búsqueda simple (nombre o país)
    const buscados = productos.filter(p => {
        const q = search.toLowerCase();
        return p.nombre.toLowerCase().includes(q) || (p.pais && p.pais.toLowerCase().includes(q));
    });

    // Aplicar filtros adicionales: precio (menor/mayor) y país específico
    const filtrados = buscados.filter(p => {
        // Precio
        if (priceFilterType && priceFilterType !== 'none' && priceFilterValue !== '') {
            const val = Number(priceFilterValue);
            if (!isFinite(val)) return false;
            if (priceFilterType === 'lt' && !(p.precio < val)) return false;
            if (priceFilterType === 'gt' && !(p.precio > val)) return false;
        }
        // País (si hay uno seleccionado, comparar insensible a mayúsculas)
        if (countryFilter && countryFilter.trim() !== '') {
            if (!p.pais) return false;
            if (p.pais.toLowerCase() !== countryFilter.trim().toLowerCase()) return false;
        }

        return true;
    });

    return (
        <>
            <div className="container product-list">
                <h2 className="text-center mb-3">Listado de productos</h2>

                {/* Botón para abrir modal de creación */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                    <button className="btn btn-success add-product-btn" onClick={() => setShowCreate(true)}>Agregar producto</button>
                </div>

                {/* Modal de creación (se abre al hacer click en 'Agregar producto') */}
                {showCreate && (
                    <Modal ariaLabel="Agregar producto" onClose={() => setShowCreate(false)}>
                        <div className="modal-card">
                            <div className="modal-header">
                                <h5>Agregar producto</h5>
                                <button className="btn btn-back" onClick={() => setShowCreate(false)}>Cerrar</button>
                            </div>
                            <div className="modal-body">
                                <ProductForm onSubmit={(data) => { crearProducto(data); setShowCreate(false); }} />
                            </div>
                        </div>
                    </Modal>
                )}

                <div className="search-row">
                    <input
                        placeholder="Buscar productos por nombre o país de origen..."
                        title={search || 'Buscar productos por nombre o país de origen...'}
                        className="form-control search-input"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Filtros adicionales: precio y país */}
                <div className="filters-row" style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'flex-end', marginBottom: 12 }}>
                    <label htmlFor={priceFilterId} className="visually-hidden">Filtro de precio</label>
                    <select id={priceFilterId} className="form-control filter-select" value={priceFilterType} onChange={(e) => setPriceFilterType(e.target.value)}>
                        <option value="none">Filtrar por precio</option>
                        <option value="lt">Precio menor que</option>
                        <option value="gt">Precio mayor que</option>
                    </select>

                    <input id={priceValueId} type="number" min="0" step="0.01" placeholder="Valor" className="form-control filter-input" value={priceFilterValue} onChange={(e) => setPriceFilterValue(e.target.value)} disabled={priceFilterType === 'none'} />

                    <label htmlFor={countryFilterId} className="visually-hidden">Filtro de país</label>
                    <input id={countryFilterId} list={`countries-${uid}`} placeholder="Filtrar por país" className="form-control filter-input" value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)} />
                    <datalist id={`countries-${uid}`}>
                        {/* construir opciones con países únicos disponibles */}
                        {Array.from(new Set(productos.map(p => p.pais).filter(Boolean))).map(c => (<option key={c} value={c} />))}
                    </datalist>

                    <button className="btn btn-back" onClick={() => { setPriceFilterType('none'); setPriceFilterValue(''); setCountryFilter(''); }}>Limpiar filtros</button>
                </div>

                {editing && (
                    <Modal ariaLabel="Editar producto" onClose={() => setEditing(null)}>
                        <div className="modal-card">
                            <div className="modal-header">
                                <h5>Editar producto</h5>
                                <button className="btn btn-back" onClick={() => setEditing(null)}>Cerrar</button>
                            </div>
                            <div className="modal-body">
                                <ProductForm initial={editing} onSubmit={(data) => actualizarProducto(editing.id, data)} onCancel={() => setEditing(null)} />
                            </div>
                        </div>
                    </Modal>
                )}

                <div className="row">
                    {filtrados.map(producto => (
                        <ProductCard key={producto.id} producto={producto} onAdd={agregarAlCarrito} onEdit={startEdit} onDelete={eliminarProducto} />
                    ))}
                </div>
            </div>

            <CartFlotante />
        </>
    );
}