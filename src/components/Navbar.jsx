import { useState, useEffect } from 'react';
import './Navbar.css';

const NAV = ['about', 'skills', 'projects'];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        {/* Logo */}
        <a href="#hero" className="nav__logo">
          <span className="nav__logo-box">DH</span>
          <span className="nav__logo-text">ILIPAN</span>
          <span className="nav__logo-ver">v2.0</span>
        </a>

        {/* Links */}
        <div className={`nav__links ${menuOpen ? 'nav__links--open' : ''}`}>
          {NAV.map((item, i) => (
            <a
              key={item}
              href={`#${item}`}
              className="nav__link"
              onClick={() => setMenuOpen(false)}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <span className="nav__link-num">0{i + 1}</span>
              {item}
            </a>
          ))}
          <a href="#contact" className="btn btn-primary nav__cta" onClick={() => setMenuOpen(false)}>
            Hire Me
          </a>
        </div>

        {/* Burger */}
        <button className={`nav__burger ${menuOpen ? 'nav__burger--open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
