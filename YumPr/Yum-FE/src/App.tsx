// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IntroPage from './pages/IntroPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import SinglePlayPage from './pages/SinglePlayPage';
import MultiPlayPage from './pages/MultiPlayPage';
import DexPage from './pages/DexPage';
import ProfilePage from './pages/ProfilePage';
import DexDetailPage from './pages/DexDetailPage';
import BottomNavBar from './components/BottomNavBar/BottomNavBar';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<IntroPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/single" element={<SinglePlayPage />} />
            <Route path="/multi" element={<MultiPlayPage />} />
            <Route path="/dex" element={<DexPage />} />
            <Route path="/dexdetail/:id" element={<DexDetailPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
          <div>
            <BottomNavBar />
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;
