import React, { useState, useEffect } from 'react';
import { NAV_SECTIONS } from '../data';

export default function Nav({ active, onNav }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur shadow-sm border-b border-gray-200' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={process.env.PUBLIC_URL + "/images/logo.svg"} alt="Transform Health" className="h-8" />
          <span className="text-sm font-medium text-gray-700 hidden lg:block border-l border-gray-300 pl-4">Women Leaders in Digital Health</span>
        </div>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1 bg-gray-100 rounded-full px-2 py-1">
          {NAV_SECTIONS.map(s => (
            <button key={s.id} onClick={() => onNav(s.id)}
              className={`nav-link ${active === s.id ? 'active' : ''}`}>
              {s.label}
            </button>
          ))}
        </div>

        {/* Mobile menu button */}
        <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="w-5 h-0.5 bg-ink mb-1"></div>
          <div className="w-5 h-0.5 bg-ink mb-1"></div>
          <div className="w-5 h-0.5 bg-ink"></div>
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 px-6 py-4 flex flex-col gap-2">
          {NAV_SECTIONS.map(s => (
            <button key={s.id} onClick={() => { onNav(s.id); setMenuOpen(false); }}
              className={`nav-link text-left ${active === s.id ? 'active' : ''}`}>
              {s.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
