// ── Cart Context ──────────────────────────────────────────────
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

export const CartProvider = ({ children }) => {
  // Restore cart from localStorage
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('mb_cart')) || [];
    } catch {
      return [];
    }
  });

  // Persist cart to localStorage on every change
  useEffect(() => {
    localStorage.setItem('mb_cart', JSON.stringify(items));
  }, [items]);

  // Add item or increase quantity
  const addItem = (flower) => {
    setItems(prev => {
      const existing = prev.find(i => i._id === flower._id);
      if (existing) {
        return prev.map(i =>
          i._id === flower._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...flower, quantity: 1 }];
    });
  };

  // Remove one unit of an item
  const removeItem = (id) => {
    setItems(prev => {
      const existing = prev.find(i => i._id === id);
      if (existing?.quantity > 1) {
        return prev.map(i => i._id === id ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i._id !== id);
    });
  };

  // Remove item entirely
  const deleteItem = (id) => {
    setItems(prev => prev.filter(i => i._id !== id));
  };

  // Clear entire cart
  const clearCart = () => setItems([]);

  // Computed values
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, deleteItem, clearCart,
      totalItems, totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};
