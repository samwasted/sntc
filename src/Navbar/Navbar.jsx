import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const navItems = [
  { id: 'home',         label: 'Home',         to: '/' },
  { id: 'clubs',        label: 'Clubs',        to: '/clubs' },
  // { id: 'activities', label: 'Activities',  to: '/activities' },
  { id: 'achievements', label: 'Achievements', to: '/achievements' },
  { id: 'team',         label: 'Team',         to: '/team' },
];

export default function Navbar() {
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
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `nav-link${isActive ? ' active' : ''}`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && <span className="active-dot" />}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
