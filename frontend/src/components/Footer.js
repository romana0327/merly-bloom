// ── Footer Component ──────────────────────────────────────────
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer__inner container">
      {/* Brand */}
      <div className="footer__brand">
        <div className="footer__logo">
          <span>✿</span>
          <span>Merly Bloom</span>
        </div>
        <p className="footer__tagline">
          Made with love, designed with blooms.
        </p>
        <p className="footer__desc">
          We craft each bouquet with care and intention, 
          turning every petal into a story of connection.
        </p>
      </div>

      {/* Links */}
      <div className="footer__links-group">
        <h4 className="footer__group-title">Shop</h4>
        <ul>
          <li><Link to="/collection">Our Collection</Link></li>
          <li><Link to="/meanings">Flower Meanings</Link></li>
          <li><Link to="/cart">Shopping Cart</Link></li>
        </ul>
      </div>

      <div className="footer__links-group">
        <h4 className="footer__group-title">Account</h4>
        <ul>
          <li><Link to="/auth">Sign In</Link></li>
          <li><Link to="/auth?tab=register">Register</Link></li>
        </ul>
      </div>

      <div className="footer__links-group">
        <h4 className="footer__group-title">Contact</h4>
        <ul>
          <li>merlybloom@gamil.com</li>
          <li>+212611042002</li>
          <li>Mon – Sat, 9am – 6pm</li>
        </ul>
      </div>
    </div>

    {/* Bottom */}
    <div className="footer__bottom">
      <p>© {new Date().getFullYear()} Merly Bloom. All rights reserved.</p>
      <p>Crafted with 𖹭 and care</p>
    </div>
  </footer>
);

export default Footer;
