import { Mountain, Flower2, Waves, Building2 } from 'lucide-react';

// Exactly four categories – nothing else is ever rendered.
const ICONS = {
  Mountains: Mountain,
  Flowers: Flower2,
  Beaches: Waves,
  Cities: Building2,
};

export default function Categories({ items, active, onSelect }) {
  return (
    <ul className="categories" aria-label="Categories">
      {items.map((name) => {
        const Icon = ICONS[name];
        const isActive = active === name;
        return (
          <li key={name}>
            <button
              type="button"
              className={`category cat-${name.toLowerCase()} ${isActive ? 'is-active' : ''}`}
              aria-pressed={isActive}
              onClick={() => onSelect(name)}
            >
              <Icon size={20} aria-hidden="true" />
              {name}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
