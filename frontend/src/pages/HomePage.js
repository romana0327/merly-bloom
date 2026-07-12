// ── Home Page ─────────────────────────────────────────────────
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FlowerCard from '../components/FlowerCard';
import './HomePage.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Occasion categories (static content)
const categories = [
  { icon: '👶', label: 'New Baby',     color: '#fce4ec' },
  { icon: '💍', label: 'Anniversaries',color: '#f3e5f5' },
  { icon: '🎂', label: 'Birthdays',    color: '#fff3e0' },
  { icon: '🌹', label: 'Roses',        color: '#fce4ec' },
  { icon: '💒', label: 'Weddings',     color: '#e8f5e9' },
  { icon: '🎓', label: 'Graduation',   color: '#e3f2fd' },
];

const HomePage = () => {
  const [featured, setFeatured]   = useState([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/flowers?featured=true`)
      .then(r => r.json())
      .then(data => setFeatured(data.data || []))
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home">
      {/* ── Hero ────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero__bg-petals" aria-hidden>
          <span className="hero__petal hero__petal--1">🌸</span>
          <span className="hero__petal hero__petal--2">🌺</span>
          <span className="hero__petal hero__petal--3">🌼</span>
          <span className="hero__petal hero__petal--4">🌸</span>
          <span className="hero__petal hero__petal--5">🌷</span>
        </div>
        <div className="hero__content container">
          <div className="hero__text">
            <span className="hero__eyebrow">✦✦✦ Handcrafted with love ✦✦✦</span>
            <h1 className="hero__title">
              <em>Merly</em> Bloom
            </h1>
            <p className="hero__subtitle">
              Where every petal tells a story. We create bespoke floral
              arrangements that speak the language of your heart.
            </p>
            <div className="hero__actions">
              <Link to="/collection" className="btn-primary">Explore Collection</Link>
              <Link to="/meanings"   className="btn-outline">Flower Meanings</Link>
            </div>
            <div className="hero__stats">
              <div className="hero__stat">
                <span className="hero__stat-num">500+</span>
                <span className="hero__stat-label">Bouquets Made</span>
              </div>
              <div className="hero__stat-divider" />
              <div className="hero__stat">
                <span className="hero__stat-num">100%</span>
                <span className="hero__stat-label">Fresh Flowers</span>
              </div>
              <div className="hero__stat-divider" />
              <div className="hero__stat">
                <span className="hero__stat-num">Next Day</span>
                <span className="hero__stat-label">Delivery</span>
              </div>
            </div>
          </div>

          {/* Hero image collage */}
          <div className="hero__images">
            <div className="hero__img-main">
              <img
                src="https://i.pinimg.com/736x/e6/42/59/e642597561784c17fe544293f4976135.jpg"
                alt="Beautiful floral arrangement"
              />
            </div>
            <div className="hero__img-accent">
              <img
                src="https://i.pinimg.com/736x/47/3e/ad/473ead9a9f5dbaac6ea7e56bc6e6a5ba.jpg"
                alt="Pink roses"
              />
            </div>
            <div className="hero__img-small">
              <img
                src="https://i.pinimg.com/736x/aa/42/84/aa428434a6aa37f282956fc5a920cd91.jpg"
                alt="Peony bouquet"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories ──────────────────────────────────── */}
      <section className="categories section">
        <div className="container">
          <h2 className="section-title">Shop by Occasion</h2>
          <p className="section-subtitle">Find the perfect bloom for every moment</p>
          <div className="categories__grid">
            {categories.map(cat => (
              <Link
                to={`/collection?category=${cat.label}`}
                key={cat.label}
                className="category-card"
                style={{ '--cat-bg': cat.color }}
              >
                <span className="category-card__icon">{cat.icon}</span>
                <span className="category-card__label">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Bouquets ────────────────────────────── */}
      <section className="featured section">
        <div className="container">
          <h2 className="section-title">Featured Arrangements</h2>
          <p className="section-subtitle">Curated selections for every taste</p>

          {loading ? (
            <div className="loading-container">
              <span className="loading-petal">🌸</span>
              <p>Gathering blooms...</p>
            </div>
          ) : (
            <div className="featured__grid">
              {featured.slice(0, 6).map((flower, i) => (
                <div key={flower._id} style={{ animationDelay: `${i * 0.1}s` }}>
                  <FlowerCard flower={flower} />
                </div>
              ))}
            </div>
          )}

          <div className="featured__cta">
            <Link to="/collection" className="btn-outline">
              View Full Collection →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Story Banner ─────────────────────────────────── */}
      <section className="story">
        <div className="story__inner container">
          <div className="story__image">
            <img
              src="https://i.pinimg.com/736x/2c/6e/ac/2c6eacfe77adc3908866d9af8e7d0b6e.jpg"
              alt="Florist at work"
            />
          </div>
          <div className="story__content">
            <span className="story__eyebrow">✦✦✦ Our Story ✦✦✦</span>
            <h2 className="story__title">Blooms crafted with intention</h2>
            <p className="story__text">
              Every bouquet we create begins with a conversation — about the person 
              you're celebrating, the moment you want to honor, the feeling you want 
              to convey. We believe flowers are more than decoration; they're a language.
            </p>
            <p className="story__text">
              From our studio, we source the finest blooms and weave them into 
              arrangements that become memories.
            </p>
            <Link to="/meanings" className="btn-primary">Discover Flower Meanings</Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────── */}
      <section className="testimonials section">
        <div className="container">
          <h2 className="section-title">What our customers say</h2>
          <p className="section-subtitle">Stories from people who found their perfect bloom</p>
          <div className="testimonials__grid">
            {[
              { name: 'B. MERYAM', text: 'The most breathtaking wedding flowers. Every guest asked about them. Merly Bloom made our day magical.', rating: 5 },
              { name: 'E. ASMAA', text: 'I ordered for my mother\'s birthday and she cried happy tears. The bouquet was more beautiful than I imagined.', rating: 5 },
              { name: 'B. SAFAA', text: 'The centerpieces took my breath away. Merly Bloom understood my vision perfectly and delivered something even better.', rating: 5 },
              { name: 'E. LAMYAA', text: 'I’ve never received such a stunning arrangement. The roses lasted over two weeks and smelled like heaven.', rating: 5 },
              { name: 'E. IMANE', text: 'Merly Bloom designed the floral arch for our ceremony. It was pure magic. Every photo looks like a fairy tale.', rating: 5 },
              { name: 'Z. MERIEM', text: 'Fresh, fragrant, and arranged with such artistry. These are not just flowers — they\'re pieces of art.', rating: 5 },
            ].map((t, i) => (
              <div className="testimonial-card" key={i}>
                <div className="testimonial-card__stars">
                  {'★'.repeat(t.rating)}
                </div>
                <p className="testimonial-card__text">"{t.text}"</p>
                <span className="testimonial-card__name"> {t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
