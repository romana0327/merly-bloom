// ── FlowerCard Component ──────────────────────────────────────
import React from 'react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import './FlowerCard.css';

const FlowerCard = ({ flower }) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(flower);
    toast.success(`🌸 ${flower.name} added to your cart`);
  };

  const discount = flower.originalPrice
    ? Math.round(((flower.originalPrice - flower.price) / flower.originalPrice) * 100)
    : null;

  return (
    <div className="flower-card">
      {/* Image */}
      <div className="flower-card__image-wrap">
        <img
          src={flower.image}
          alt={flower.name}
          className="flower-card__image"
          loading="lazy"
        />
        {/* Badges */}
        <div className="flower-card__badges">
          {flower.isBestSeller && (
            <span className="flower-card__badge flower-card__badge--best">Best Seller</span>
          )}
          {discount && (
            <span className="flower-card__badge flower-card__badge--sale">-{discount}%</span>
          )}
        </div>
        {/* Quick add overlay */}
        <div className="flower-card__overlay">
          <button onClick={handleAddToCart} className="flower-card__overlay-btn">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flower-card__info">
        <span className="flower-card__category">{flower.category}</span>
        <h3 className="flower-card__name">{flower.name}</h3>
        <p className="flower-card__desc">{flower.description}</p>

        <div className="flower-card__footer">
          <div className="flower-card__price">
            <span className="flower-card__price-current">${flower.price}</span>
            {flower.originalPrice && (
              <span className="flower-card__price-original">${flower.originalPrice}</span>
            )}
          </div>
          <button onClick={handleAddToCart} className="flower-card__btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlowerCard;
