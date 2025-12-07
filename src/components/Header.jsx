import React from 'react';

// Cabecera de la aplicación con logos y elementos decorativos
export default function Header() {
    return (
        <header id="header" className="header-super-sano">
            <img src="/images/sanito_logo.png" alt="logo Super Sano" className="header-logo" />
            {/* imágenes decorativas: alt vacíos para accesibilidad */}
            <img src="/images/hoja1.png" alt="" className="hoja-cayendo leaf-1" />
            <img src="/images/hoja3.png" alt="" className="hoja-cayendo leaf-2" />
            <img src="/images/hoja2.png" alt="" className="hoja-cayendo leaf-3" />

            <div className="header-super-sano-content">
                <h1 className="mb-0 h1-3d">Super Sano</h1>
                <p className="lead mb-0">Alimentación consciente, productos naturales.</p>
            </div>

            <img src="/images/SS-logo.png" alt="logo Super Sano" className="header-sslogo" />
        </header>
    );
}
