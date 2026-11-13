import SearchBar from './SearchBar.jsx';
import Categories from './Categories.jsx';

export default function Hero({ value, onChange, onSearch, categories, activeCategory }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <span className="blob blob-pink" aria-hidden="true" />
      <span className="blob blob-blue" aria-hidden="true" />
      <span className="blob blob-orange" aria-hidden="true" />
      <div className="container hero-inner">
        <h1 id="hero-title">Discover the World Through Images</h1>
        <p className="hero-subtitle">
          Explore beautiful photographs, discover new perspectives and find inspiration for your
          next idea.
        </p>
        <SearchBar value={value} onChange={onChange} onSubmit={onSearch} />
        <Categories items={categories} active={activeCategory} onSelect={onSearch} />
      </div>
    </section>
  );
}
