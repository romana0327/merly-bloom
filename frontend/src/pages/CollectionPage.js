// ── Collection Page ───────────────────────────────────────────
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FlowerCard from '../components/FlowerCard';
import './CollectionPage.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const CATEGORIES = ['All', 'Wedding', 'Birthday', 'Anniversary', 'Roses', 'Seasonal', 'Sympathy', 'Congratulations'];

const SORT_OPTIONS = [
  { value: 'default',    label: 'Featured' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc',   label: 'Name: A → Z' },
];

const CollectionPage = () => {
  const [flowers,    setFlowers]    = useState([]);
  const [filtered,   setFiltered]   = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);
  const [sortBy,     setSortBy]     = useState('default');
  const [searchParams, setSearchParams] = useSearchParams();

  // Active category from URL query param (e.g. ?category=Wedding)
  const activeCategory = searchParams.get('category') || 'All';

  // Fetch all flowers once
  useEffect(() => {
    fetch(`${API_URL}/flowers`)
      .then(r => r.json())
      .then(data => {
        setFlowers(data.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load flowers. Please try again later.');
        setLoading(false);
      });
  }, []);

  // Filter + sort whenever flowers, category, or sort changes
  useEffect(() => {
    let result = [...flowers];

    // Filter by category
    if (activeCategory !== 'All') {
      result = result.filter(f => f.category === activeCategory);
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':  result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'name-asc':   result.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: break; // keep original order (featured)
    }

    setFiltered(result);
  }, [flowers, activeCategory, sortBy]);

  const setCategory = (cat) => {
    if (cat === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  return (
    <div className="collection-page">
      {/* Page header */}
      <div className="collection-hero">
        <div className="collection-hero__petals" aria-hidden>
          <span>🌸</span><span>🌺</span><span>🌼</span>
        </div>
        <div className="container">
          <span className="collection-hero__eyebrow">✦✦✦ Browse Our Work ✦✦✦</span>
          <h1 className="collection-hero__title">Our Collection</h1>
          <p className="collection-hero__subtitle">
            Every arrangement is handcrafted in our studio with the freshest seasonal blooms.
          </p>
        </div>
      </div>

      <div className="container">
        {/* Controls: filter + sort */}
        <div className="collection-controls">
          {/* Category filter pills */}
          <div className="collection-filters">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`collection-filter-btn ${activeCategory === cat ? 'collection-filter-btn--active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div className="collection-sort">
            <label htmlFor="sort-select">Sort by:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="collection-sort__select"
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Result count */}
        {!loading && !error && (
          <p className="collection-count">
            Showing <strong>{filtered.length}</strong> arrangement{filtered.length !== 1 ? 's' : ''}
            {activeCategory !== 'All' && <> in <em>{activeCategory}</em></>}
          </p>
        )}

        {/* Loading */}
        {loading && (
          <div className="loading-container">
            <span className="loading-petal">🌸</span>
            <p>Gathering our blooms...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="error-container">
            <h3>Oops!</h3>
            <p>{error}</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filtered.length === 0 && (
          <div className="collection-empty">
            <span>🌱</span>
            <h3>No arrangements found</h3>
            <p>Try a different category or check back soon for new arrivals.</p>
            <button onClick={() => setCategory('All')} className="btn-primary">
              View All
            </button>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && filtered.length > 0 && (
          <div className="collection-grid">
            {filtered.map((flower, i) => (
              <div key={flower._id} style={{ animationDelay: `${(i % 12) * 0.07}s` }}>
                <FlowerCard flower={flower} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
