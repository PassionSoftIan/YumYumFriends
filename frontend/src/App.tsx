import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import SinglePlayPage from "./pages/SinglePlayPage";
import MultiChoicePage from "./pages/MultiChoicePage";
import GameClearPage from "./pages/GameClearPage";
import SettingsPage from "./pages/SettingsPage";
import SelectPage from "./pages/SelectPage";
import ObservationPage from "./pages/ObservationPage";
import InvitationYum from "./components/SinglePage/InvitationYum";

import MultiPlayPage from "./pages/MultiPlayPage";
import MultiSelectRoomPage from "./pages/MultiSelectRoomPage";
import MultiCreateRoomPage from "./pages/MultiCreateRoomPage";

import NavBar from "./components/NavBar/NavBar";
import AudioPlayer from "./components/Audio/AudioPlayer"; // Use "AudioPlayer" with an uppercase "P"
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";

const App: React.FC = () => {
  const [nickname, setNickname] = useState<string | undefined>(undefined);

  useEffect(() => {
    // 로컬스토리지에서 nickname을 가져와서 상태로 설정합니다.
    const storedNickname = localStorage.getItem("nickname");
    if (storedNickname) {
      setNickname(JSON.parse(storedNickname));
    }
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          {/* <Cloud /> */}
          <header className="App-header">
            {/* <img className="sun-image" src={} alt="" /> */}
            <Router>
              <div className="navbar-container">
                <NavBar />
              </div>
              <Routes>
                <Route path="/" element={<IntroPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/single" element={<SinglePlayPage />} />
                <Route path="/gameclear" element={<GameClearPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/select" element={<SelectPage />} />

                <Route path="/observation" element={<ObservationPage />} />
                <Route path="/invitation" element={<InvitationYum />} />

                <Route path="/multichoice" element={<MultiChoicePage />} />
                <Route path="/multiplay" element={<MultiPlayPage />} />
                <Route path="/multiroom" element={<MultiSelectRoomPage />} />
                <Route path="/multicreate" element={<MultiCreateRoomPage />} />
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
