// ── Auth Page ─────────────────────────────────────────────────
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './AuthPage.css';

const AuthPage = () => {
  const [searchParams]    = useSearchParams();
  // Switch tab via URL query e.g. /auth?tab=register
  const [tab, setTab]     = useState(searchParams.get('tab') === 'register' ? 'register' : 'login');
  const [loading, setLoading] = useState(false);

  // Login form state
  const [loginForm, setLoginForm]   = useState({ email: '', password: '' });
  // Register form state
  const [regForm, setRegForm]       = useState({ name: '', email: '', password: '', confirm: '' });

  const { login, register, user }   = useAuth();
  const navigate                    = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  // ── Login ───────────────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(loginForm.email, loginForm.password);
      toast.success('.✦ ݁˖ Welcome back!');
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── Register ─────────────────────────────────────────────────
  const handleRegister = async (e) => {
    e.preventDefault();
    if (regForm.password !== regForm.confirm) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await register(regForm.name, regForm.email, regForm.password);
      toast.success('.✦ ݁˖ Welcome to Merly Bloom!');
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Decorative side */}
      <div className="auth-deco">
        <img
          src="https://i.pinimg.com/736x/cf/4b/51/cf4b51b921876acbdd037910a566be4f.jpg"
          alt="Beautiful flowers"
          className="auth-deco__img"
        />
        <div className="auth-deco__overlay" />
        <div className="auth-deco__content">
          <span className="auth-deco__logo"> Merly Bloom</span>
          <h2 className="auth-deco__title">
            Every petal,<br /><em>a story</em>
          </h2>
          <p className="auth-deco__text">
            Join our community and discover the art of gifting with flowers.
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="auth-panel">
        <div className="auth-panel__inner">
          {/* Mobile logo */}
          <Link to="/" className="auth-panel__logo-mobile">
             Merly Bloom
          </Link>

          {/* Tab switcher */}
          <div className="auth-tabs">
            <button
              className={`auth-tab ${tab === 'login' ? 'auth-tab--active' : ''}`}
              onClick={() => setTab('login')}
            >
              Sign In
            </button>
            <button
              className={`auth-tab ${tab === 'register' ? 'auth-tab--active' : ''}`}
              onClick={() => setTab('register')}
            >
              Create Account
            </button>
          </div>

          {/* ── Login form ── */}
          {tab === 'login' && (
            <form className="auth-form" onSubmit={handleLogin}>
              <h1 className="auth-form__title">Welcome back</h1>
              <p className="auth-form__subtitle">Sign in to your Merly Bloom account</p>

              <div className="auth-field">
                <label htmlFor="login-email">Email</label>
                <input
                  id="login-email"
                  type="email"
                  placeholder="you@email.com"
                  value={loginForm.email}
                  onChange={e => setLoginForm({ ...loginForm, email: e.target.value })}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="auth-field">
                <label htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={loginForm.password}
                  onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                  required
                  autoComplete="current-password"
                />
              </div>

              <button type="submit" className="auth-submit" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </button>

              <p className="auth-switch">
                Don't have an account?{' '}
                <button type="button" onClick={() => setTab('register')}>Create one</button>
              </p>
            </form>
          )}

          {/* ── Register form ── */}
          {tab === 'register' && (
            <form className="auth-form" onSubmit={handleRegister}>
              <h1 className="auth-form__title">Join us</h1>
              <p className="auth-form__subtitle">Create your Merly Bloom account</p>

              <div className="auth-field">
                <label htmlFor="reg-name">Full Name</label>
                <input
                  id="reg-name"
                  type="text"
                  placeholder="Your name"
                  value={regForm.name}
                  onChange={e => setRegForm({ ...regForm, name: e.target.value })}
                  required
                  autoComplete="name"
                />
              </div>

              <div className="auth-field">
                <label htmlFor="reg-email">Email</label>
                <input
                  id="reg-email"
                  type="email"
                  placeholder="you@email.com"
                  value={regForm.email}
                  onChange={e => setRegForm({ ...regForm, email: e.target.value })}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="auth-field">
                <label htmlFor="reg-password">Password</label>
                <input
                  id="reg-password"
                  type="password"
                  placeholder="Min 6 characters"
                  value={regForm.password}
                  onChange={e => setRegForm({ ...regForm, password: e.target.value })}
                  required
                  minLength={6}
                  autoComplete="new-password"
                />
              </div>

              <div className="auth-field">
                <label htmlFor="reg-confirm">Confirm Password</label>
                <input
                  id="reg-confirm"
                  type="password"
                  placeholder="Repeat your password"
                  value={regForm.confirm}
                  onChange={e => setRegForm({ ...regForm, confirm: e.target.value })}
                  required
                  autoComplete="new-password"
                />
              </div>

              <button type="submit" className="auth-submit" disabled={loading}>
                {loading ? 'Creating account...' : 'Create Account'}
              </button>

              <p className="auth-switch">
                Already have an account?{' '}
                <button type="button" onClick={() => setTab('login')}>Sign in</button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
