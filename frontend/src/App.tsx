import React, { useEffect, useRef, useState } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import SinglePlayPage from "./pages/SinglePlayPage";
import MultiPlayPage from "./pages/MultiPlayPage";
import DexPage from "./pages/DexPage";
import ProfilePage from "./pages/ProfilePage";
import DexDetailPage from "./pages/DexDetailPage";
import GameClearPage from "./pages/GameClearPage";
import SettingsPage from "./pages/SettingsPage";
import SelectPage from "./pages/SelectPage";
import ObservationPage from "./pages/ObservationPage";
import NavBar from "./components/NavBar/NavBar";
import AudioPlayer from "./components/Audio/AudioPlayer"; // Use "AudioPlayer" with an uppercase "P"
import { PersistGate } from 'redux-persist/integration/react';
import Sun from "./assets/Common/sun_smile.png";
import Cloud from "./components/Animation/Cloud";
import "./App.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Cloud />
          <header className="App-header">
            <img className="sun-image" src={Sun} alt="" />
            <Router>
              <div className="navbar-container">
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
                <Route path="/gameclear" element={<GameClearPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/select" element={<SelectPage />} />
                <Route path="/observation" element={<ObservationPage />} />
              </Routes>
              <AudioPlayer /> {/* 추가: AudioPlayer 컴포넌트를 렌더링합니다. */}
            </Router>
          </header>
        </div>
      </PersistGate>
    </Provider>
  );
};

export default App;
