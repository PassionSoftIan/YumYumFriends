import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IntroPage from './pages/IntroPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import SinglePlayPage from './pages/SinglePlayPage';
import MultiPlayPage from './pages/MultiPlayPage';
<<<<<<< HEAD:YumPr/Yum-FE/src/App.tsx
// import OpenViduComponent from './OpenVidu';
=======
import DexPage from './pages/DexPage';
import AnyComponent from './pages/any';
>>>>>>> 6fd216d1904aa4779f425dda2703195f75bc3110:YumPr/yumfr/src/App.tsx
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
