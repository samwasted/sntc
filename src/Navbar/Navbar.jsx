import React, { useState } from 'react';
import './Navbar.css';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'clubs', label: 'Clubs' },
  { id: 'activities', label: 'Activities' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'team', label: 'Team' },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('achievements');

  return (
    <header className="navbar-wrapper">
      <nav className="glass-pill-navbar" aria-label="Main Navigation">
        <ul className="navbar-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                {item.label}
                {activeTab === item.id && (
                  <span className="active-pill-glow" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
