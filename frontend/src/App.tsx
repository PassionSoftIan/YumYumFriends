// App.tsx

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
import GameClearPage from './pages/GameClearPage';
import SettingsPage from './pages/SettingsPage';
import SelectPage from './pages/SelectPage';
import NavBar from './components/NavBar/NavBar';

import Sun from "./assets/Common/sun_smile.png"
import Cloud from "./components/Animation/Cloud";
import './App.css';

function App() {
  return (
    <div className="App">
      <Cloud />
      <header className="App-header">
      <img className="sun-image" src={Sun} alt="" />
        <Router>
          <div className="navbar-container"> {/* 이 부분에 navbar-container 클래스 추가 */}
            <NavBar />
          </div>
          <Routes>
            <Route path="/" element={<IntroPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/single" element={<SinglePlayPage />} />
            <Route path="/multi" element={<MultiPlayPage />} />
            <Route path="/dex" element={<DexPage />} />
            <Route path="/dexdetail/:id" element={<DexDetailPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/gameclear" element={<GameClearPage />}/>
            <Route path="/settings" element={<SettingsPage />}/>
            <Route path="/select" element={<SelectPage />}/>
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
