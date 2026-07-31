import React, { useEffect, useRef } from 'react';
import './Navbar.css';

const navItems = [
  { id: 'home',         label: 'Home' },
  { id: 'clubs',        label: 'Clubs' },
  { id: 'activities',   label: 'Activities' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'team',         label: 'Team' },
];

export default function Navbar({ activeTab, setActiveTab }) {
  const wrapRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (wrapRef.current) {
        wrapRef.current.dataset.scrolled = window.scrollY > 50 ? '1' : '0';
      }
    };
    onScroll(); // set initial state immediately
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header ref={wrapRef} className="navbar-wrapper" data-scrolled="0">
      <div className="nav-inner">
        <span className="nav-brand">SNTC</span>
        <ul className="navbar-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                {item.label}
                {activeTab === item.id && <span className="active-dot" />}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
