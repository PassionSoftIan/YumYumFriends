// App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IntroPage from './pages/IntroPage'; // StartLogoPage 대신 IntroPage로 변경
import LoginPage from './pages/LoginPage';
import './App.css';

function App() {
  const [showStartLogo, setShowStartLogo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStartLogo(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={showStartLogo ? <IntroPage /> : <LoginPage />} />
            <Route path="/main" element={<LoginPage />} /> {/* LoginPage로 수정 */}
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
