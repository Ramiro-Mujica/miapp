import React from 'react';

export default function Footer() {
    return (
        <footer className="footer-super-sano">
            <div className="footer-inner">
                <p className="mb-1">📍 Buenos Aires | ✉️ info@supersano.com | ☎️ +54 11 1234 5678</p>
                <div className="footer-social">
                    <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon facebook"><i className="fab fa-facebook-f"></i></a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon instagram"><i className="fab fa-instagram"></i></a>
                    <a href="https://wa.me/541112345678" target="_blank" rel="noreferrer" className="social-icon whatsapp"><i className="fab fa-whatsapp"></i></a>
                </div>
                        <div className="footer-bottom">
                            <p className="footer-note">Gracias por elegir <strong>Super Sano</strong> 🌿</p>
                            <img src="/images/calidad.png" alt="calidad" className="footer-calidad" />
                        </div>
            </div>
        </footer>
    );
}
