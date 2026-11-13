import { useState } from 'react';
import { Aperture, Menu, X } from 'lucide-react';

const LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Explore', href: '#explore' },
  { label: 'About', href: '#about' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header-inner">
        <a className="brand" href="#top" onClick={() => setOpen(false)}>
          <span className="brand-icon" aria-hidden="true">
            <Aperture size={24} />
          </span>
          <span className="brand-text">
            <span className="brand-name">RiseUpp</span>
            <span className="brand-tagline">Discover. Explore. Get Inspired.</span>
          </span>
        </a>

        <nav id="primary-nav" className={`nav ${open ? 'nav-open' : ''}`} aria-label="Primary">
          {LINKS.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="menu-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}
