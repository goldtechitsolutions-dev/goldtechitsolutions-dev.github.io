import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo-transparent.png';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <nav className="navbar">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '100%' }}>
                <Link
                    to="/"
                    className="logo-container"
                    style={{ textDecoration: 'none' }}
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        closeMobileMenu();
                    }}
                    title="GOLDTECH IT - Home"
                >
                    <img src={logo} alt="GOLDTECH IT Logo - Leading IT Solutions & Software Development" className="logo-img" />
                    <div className="brand-name">
                        <span className="brand-gold" style={{ letterSpacing: '2px' }}>GOLD</span>
                        <span style={{ color: 'var(--color-blue-accent)', letterSpacing: '2px' }}>TECH IT</span>
                    </div>
                </Link>

                {/* Desktop Links */}
                <ul className="nav-links">
                    <li><Link to="/services" className="nav-link">Services</Link></li>
                    <li><Link to="/industries" className="nav-link">Industries</Link></li>
                    <li><Link to="/insights" className="nav-link">Insights</Link></li>
                    <li><Link to="/about" className="nav-link">About</Link></li>
                    <li><Link to="/products" className="nav-link">Products</Link></li>
                    <li><Link to="/career" className="nav-link">Career</Link></li>
                    <li><Link to="/contact" className="nav-link">Contact Us</Link></li>
                </ul>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-menu-btn"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                <ul className="mobile-nav-links">
                    <li><Link to="/services" onClick={closeMobileMenu}>Services</Link></li>
                    <li><Link to="/industries" onClick={closeMobileMenu}>Industries</Link></li>
                    <li><Link to="/insights" onClick={closeMobileMenu}>Insights</Link></li>
                    <li><Link to="/about" onClick={closeMobileMenu}>About</Link></li>
                    <li><Link to="/products" onClick={closeMobileMenu}>Products</Link></li>
                    <li><Link to="/career" onClick={closeMobileMenu}>Career</Link></li>
                    <li><Link to="/contact" onClick={closeMobileMenu}>Contact Us</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
