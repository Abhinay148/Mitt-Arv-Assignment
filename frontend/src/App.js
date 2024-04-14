import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Logsignup from './Components/Logsignup';
import Home from './Components/Home';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Logsignup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
