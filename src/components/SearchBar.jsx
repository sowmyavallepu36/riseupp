import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange, onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault(); // Enter key and button click both submit the form
    onSubmit(value);
  };

  return (
    <form className="search" role="search" onSubmit={handleSubmit}>
      <Search className="search-icon" size={22} aria-hidden="true" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search mountains, flowers, beaches, cities..."
        aria-label="Search images"
        enterKeyHint="search"
        autoComplete="off"
      />
      <button type="submit" className="search-btn" aria-label="Search">
        <Search size={20} aria-hidden="true" className="search-btn-icon" />
        <span className="search-btn-label">Search</span>
      </button>
    </form>
  );
}
