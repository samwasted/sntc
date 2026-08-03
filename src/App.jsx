import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Achievements from './Achievements/Achievements';
import Home from './Home/Home';
import Clubs from './Clubs/Clubs';
import Team from './Team/Team';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const location = useLocation();

  useEffect(() => {
    // Kill all scroll triggers so pinned sections don't hijack scroll position
    ScrollTrigger.getAll().forEach(t => t.kill());
    // Reset scroll to top instantly before mounting new page
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/"            element={<Home />} />
        <Route path="/clubs"       element={<Clubs />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/team"        element={<Team />} />
      </Routes>
    </>
  );
}

export default App;