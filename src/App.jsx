import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Achievements from './Achievements/Achievements';
import Home from './Home/Home';
import Clubs from './Clubs/Clubs';
import Team from './Team/Team';

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/"             element={<Home />} />
        <Route path="/clubs"        element={<Clubs />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/team"         element={<Team />} />
        <Route path="*"             element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;