// ── Flower Meanings Page ──────────────────────────────────────
import React, { useEffect, useState } from 'react';
import './MeaningsPage.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const MeaningsPage = () => {
  const [meanings, setMeanings] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const [active,   setActive]   = useState(null); // expanded card index

  useEffect(() => {
    fetch(`${API_URL}/meanings`)
      .then(r => r.json())
      .then(data => {
        setMeanings(data.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load flower meanings. Please try again later.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="meanings-page">
      {/* Header */}
      <div className="meanings-hero">
        <div className="meanings-hero__decor" aria-hidden>
          <span>🌷</span><span>🌸</span><span>🌼</span><span>🌺</span>
        </div>
        <div className="container">
          <span className="meanings-hero__eyebrow">✦✦✦ The Language of Flowers ✦✦✦</span>
          <h1 className="meanings-hero__title">Flower Meanings</h1>
          <p className="meanings-hero__subtitle">
            Flowers have carried hidden messages for centuries. Discover what each bloom 
            whispers and learn to speak in petals.
          </p>
        </div>
      </div>

      {/* Intro quote */}
      <div className="meanings-quote container">
        <blockquote>
          "Flowers are the music of the ground, from earth's lips spoken without sound."
          <cite> ✿ Edwin Curran ✿ </cite>
        </blockquote>
      </div>

      <div className="container">
        {loading && (
          <div className="loading-container">
            <span className="loading-petal">✿</span>
            <p>Exploring the garden...</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <h3>Oops!</h3>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="meanings-grid">
            {meanings.map((m, i) => (
              <div
                key={m._id}
                className={`meaning-card ${active === i ? 'meaning-card--active' : ''}`}
                style={{ animationDelay: `${i * 0.08}s`, '--accent': m.color || '#ffc0cc' }}
                onClick={() => setActive(active === i ? null : i)}
              >
                {/* Image */}
                <div className="meaning-card__image-wrap">
                  <img
                    src={m.image}
                    alt={m.flowerName}
                    className="meaning-card__image"
                    loading="lazy"
                  />
                  <div className="meaning-card__image-overlay" />
                  <h2 className="meaning-card__flower-name">{m.flowerName}</h2>
                </div>

                {/* Content */}
                <div className="meaning-card__body">
                  {/* Occasions pills */}
                  <div className="meaning-card__occasions">
                    {m.occasions.map(occ => (
                      <span key={occ} className="meaning-card__occasion-pill">{occ}</span>
                    ))}
                  </div>

                  <p className="meaning-card__meaning">{m.meaning}</p>

                  {/* Fun fact - visible when expanded */}
                  {active === i && m.funFact && (
                    <div className="meaning-card__fact">
                      <span className="meaning-card__fact-icon">˙ᵕ˙</span>
                      <p>{m.funFact}</p>
                    </div>
                  )}

                  <button className="meaning-card__toggle">
                    {active === i ? 'Show less ↑' : 'Fun fact ↓'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="meanings-cta">
        <div className="container">
          <h2 className="meanings-cta__title">
            Ready to send a message with flowers?
          </h2>
          <p className="meanings-cta__sub">
            Browse our curated collection and find the perfect bloom to tell your story.
          </p>
          <a href="/collection" className="btn-primary">Shop the Collection</a>
        </div>
      </div>
    </div>
  );
};

export default MeaningsPage;
