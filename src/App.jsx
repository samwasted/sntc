import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Achievements from './Achievements/Achievements';
import Home from './Home/Home';
import Clubs from './Clubs/Clubs';
import Team from './Team/Team';

function App() {
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