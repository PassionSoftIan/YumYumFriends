import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IntroPage from './pages/IntroPage';
import LoginPage from './pages/LoginPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<IntroPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
