import React, { useState } from 'react';
import Navbar from './Navbar/Navbar';
import Achievements from './Achievements/Achievements';
import Home from './Home/Home';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    // Kill all scroll triggers so pinned sections don't hijack scroll position
    ScrollTrigger.getAll().forEach(t => t.kill());
    // Reset scroll to top instantly before mounting new page
    window.scrollTo({ top: 0, behavior: 'instant' });
    setActiveTab(tab);
  };

  return (
    <>
      <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />

      {activeTab === 'home'         && <Home />}
      {activeTab === 'achievements' && <Achievements />}
    </>
  );
}

export default App;