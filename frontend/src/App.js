// ── App.js ────────────────────────────────────────────────────
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CollectionPage from './pages/CollectionPage';
import MeaningsPage from './pages/MeaningsPage';
import AuthPage from './pages/AuthPage';
import CartPage from './pages/CartPage';

function App() {
  return (
    <Router>
      {/* Global auth and cart state providers */}
      <AuthProvider>
        <CartProvider>
          {/* Toast notifications */}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#fff5f7',
                color: '#3a3228',
                border: '1px solid #ffc0cc',
                fontFamily: "'Jost', sans-serif",
                fontSize: '0.875rem',
                borderRadius: '999px',
                padding: '12px 20px',
              }
            }}
          />
          <Navbar />
          <main>
            <Routes>
              <Route path="/"            element={<HomePage />} />
              <Route path="/collection"  element={<CollectionPage />} />
              <Route path="/meanings"    element={<MeaningsPage />} />
              <Route path="/auth"        element={<AuthPage />} />
              <Route path="/cart"        element={<CartPage />} />
            </Routes>
          </main>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
