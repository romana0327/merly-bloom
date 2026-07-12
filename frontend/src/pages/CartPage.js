// ── Cart Page ─────────────────────────────────────────────────
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './CartPage.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const CartPage = () => {
  const { items, addItem, removeItem, deleteItem, clearCart, totalItems, totalPrice } = useCart();
  const { user, token } = useAuth();
  const navigate = useNavigate();

  // Order form state (for guest checkout)
  const [showForm,  setShowForm]  = useState(false);
  const [placing,   setPlacing]   = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  const [orderNum,  setOrderNum]  = useState('');

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    street: '',
    city: '',
    zip: '',
    note: ''
  });

  // ── Place order ──────────────────────────────────────────────
  const placeOrder = async (e) => {
    e.preventDefault();
    setPlacing(true);

    const orderPayload = {
      items: items.map(i => ({
        flower:   i._id,
        name:     i.name,
        price:    i.price,
        image:    i.image,
        quantity: i.quantity
      })),
      total: totalPrice,
      deliveryAddress: { street: form.street, city: form.city, zipCode: form.zip },
      note: form.note,
      ...(!user && { guestName: form.name, guestEmail: form.email })
    };

    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify(orderPayload)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setOrderNum(data.data._id.slice(-6).toUpperCase());
      clearCart();
      setOrderDone(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      toast.error(err.message || 'Failed to place order. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  // ── Order success screen ─────────────────────────────────────
  if (orderDone) {
    return (
      <div className="cart-page">
        <div className="order-success container">
          <div className="order-success__icon">✿</div>
          <h1 className="order-success__title">Your order is placed!</h1>
          <p className="order-success__msg">
            Thank you for choosing Merly Bloom. We'll prepare your arrangement with love ♡
          </p>
          <div className="order-success__ref">
            Order Reference: <strong>#{orderNum}</strong>
          </div>
          <div className="order-success__actions">
            <Link to="/collection" className="btn-primary">Continue Shopping</Link>
            <Link to="/" className="btn-outline">Go Home</Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Empty cart ───────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty container">
          <span className="cart-empty__icon">🛒</span>
          <h2 className="cart-empty__title">Your cart is empty</h2>
          <p className="cart-empty__text">
            Looks like you haven't added any flowers yet. Let's find something beautiful.
          </p>
          <Link to="/collection" className="btn-primary">Browse Collection</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-hero">
        <div className="container">
          <h1 className="cart-hero__title">Your Cart</h1>
          <p className="cart-hero__sub">{totalItems} item{totalItems !== 1 ? 's' : ''} selected</p>
        </div>
      </div>

      <div className="container">
        <div className="cart-layout">
          {/* ── Cart items ── */}
          <div className="cart-items">
            {items.map(item => (
              <div key={item._id} className="cart-item">
                <div className="cart-item__image">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="cart-item__info">
                  <span className="cart-item__category">{item.category}</span>
                  <h3 className="cart-item__name">{item.name}</h3>
                  <span className="cart-item__price">${item.price} each</span>
                </div>

                {/* Quantity controls */}
                <div className="cart-item__qty">
                  <button onClick={() => removeItem(item._id)} className="cart-item__qty-btn">−</button>
                  <span className="cart-item__qty-num">{item.quantity}</span>
                  <button onClick={() => addItem(item)}        className="cart-item__qty-btn">+</button>
                </div>

                {/* Subtotal */}
                <div className="cart-item__subtotal">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                {/* Remove */}
                <button
                  onClick={() => deleteItem(item._id)}
                  className="cart-item__remove"
                  aria-label="Remove item"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* ── Summary + checkout ── */}
          <div className="cart-summary">
            <div className="cart-summary__card">
              <h2 className="cart-summary__title">Order Summary</h2>

              <div className="cart-summary__rows">
                {items.map(item => (
                  <div key={item._id} className="cart-summary__row">
                    <span>{item.name} × {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="cart-summary__divider" />

              <div className="cart-summary__total">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <div className="cart-summary__note">
                <span>🚚</span>
                <span>Free delivery on orders over $100</span>
              </div>

              {!showForm ? (
                <button
                  className="btn-primary cart-summary__checkout-btn"
                  onClick={() => setShowForm(true)}
                >
                  Proceed to Checkout
                </button>
              ) : (
                /* ── Checkout form ── */
                <form className="checkout-form" onSubmit={placeOrder}>
                  <h3 className="checkout-form__title">Delivery Details</h3>

                  {/* Guest fields - only if not logged in */}
                  {!user && (
                    <>
                      <div className="checkout-field">
                        <label>Full Name</label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div className="checkout-field">
                        <label>Email</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={e => setForm({ ...form, email: e.target.value })}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </>
                  )}

                  <div className="checkout-field">
                    <label>Street Address</label>
                    <input
                      type="text"
                      value={form.street}
                      onChange={e => setForm({ ...form, street: e.target.value })}
                      placeholder="123 Blossom Lane"
                      required
                    />
                  </div>

                  <div className="checkout-field-row">
                    <div className="checkout-field">
                      <label>City</label>
                      <input
                        type="text"
                        value={form.city}
                        onChange={e => setForm({ ...form, city: e.target.value })}
                        placeholder="City"
                        required
                      />
                    </div>
                    <div className="checkout-field">
                      <label>ZIP Code</label>
                      <input
                        type="text"
                        value={form.zip}
                        onChange={e => setForm({ ...form, zip: e.target.value })}
                        placeholder="12345"
                        required
                      />
                    </div>
                  </div>

                  <div className="checkout-field">
                    <label>Note (optional)</label>
                    <textarea
                      value={form.note}
                      onChange={e => setForm({ ...form, note: e.target.value })}
                      placeholder="Special delivery instructions, card message..."
                      rows={3}
                    />
                  </div>

                  <button type="submit" className="btn-primary cart-summary__checkout-btn" disabled={placing}>
                    {placing ? 'Placing order...' : '✿ Place Order'}
                  </button>

                  <button
                    type="button"
                    className="checkout-form__cancel"
                    onClick={() => setShowForm(false)}
                  >
                    ← Back to cart
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
