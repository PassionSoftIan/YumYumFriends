import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IntroPage from './pages/IntroPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import SinglePlayPage from './pages/SinglePlayPage';
import MultiPlayPage from './pages/MultiPlayPage';
import DexPage from './pages/DexPage';
import AnyComponent from './pages/any';
import './App.css';

function App() {
  return (
    <div className="App">
      <AnyComponent />
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<IntroPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/single" element={<SinglePlayPage />} />
            <Route path="/multi" element={<MultiPlayPage />} />
            <Route path="/dex" element={<DexPage />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
