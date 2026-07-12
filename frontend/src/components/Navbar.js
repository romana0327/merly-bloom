// ── Navbar Component ──────────────────────────────────────────
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const { user, logout }              = useAuth();
  const { totalItems }                = useCart();
  const location                      = useLocation();
  const navigate                      = useNavigate();

  // Add background on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { to: '/',           label: 'Home' },
    { to: '/collection', label: 'Collection' },
    { to: '/meanings',   label: 'Flower Meanings' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
  <img
    src="https://i.pinimg.com/1200x/6c/94/1d/6c941d391d3e74c2215510c3870c6b2f.jpg"
    alt="Merly Bloom"
    className="navbar__logo-image"
  />
  <span className="navbar__logo-text">Merly Bloom</span>
</Link>

        {/* Desktop links */}
        <ul className="navbar__links">
          {navLinks.map(link => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`navbar__link ${location.pathname === link.to ? 'navbar__link--active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side actions */}
        <div className="navbar__actions">
          {user ? (
            <>
              <span className="navbar__greeting">Hi, {user.name.split(' ')[0]}</span>
              <button onClick={handleLogout} className="navbar__btn navbar__btn--outline">
                Logout
              </button>
            </>
          ) : (
            <Link to="/auth" className="navbar__btn navbar__btn--outline">Sign In</Link>
          )}

          {/* Cart */}
          <Link to="/cart" className="navbar__cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {totalItems > 0 && (
              <span className="navbar__cart-badge">{totalItems}</span>
            )}
          </Link>

          {/* Mobile hamburger */}
          <button
            className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
        {navLinks.map(link => (
          <Link key={link.to} to={link.to} className="navbar__mobile-link">
            {link.label}
          </Link>
        ))}
        {user ? (
          <button onClick={handleLogout} className="navbar__mobile-link">Logout</button>
        ) : (
          <Link to="/auth" className="navbar__mobile-link">Sign In</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
