import React, { useState } from 'react';
import Navbar from './Navbar/Navbar';
import Achievements from './Achievements/Achievements';
import Home from './Home/Home';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'home'         && <Home />}
      {activeTab === 'achievements' && <Achievements />}
    </>
  );
}

export default App;