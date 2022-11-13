import React, { useEffect } from "react";
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Game from './interface/components/Game'
import Home from './interface/components/Home'
import { routes } from "./interface/routes/routes";
import Header from "./interface/components/header"

const App = () => {
  const [isReadyForInstall, setIsReadyForInstall] = React.useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      window.deferredPrompt = event;
      setIsReadyForInstall(true);
    });
  }, []);

  async function downloadApp() {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      return;
    }
    promptEvent.prompt();
    await promptEvent.userChoice;
    window.deferredPrompt = null;
    setIsReadyForInstall(false);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Header downloadApp={downloadApp} isReadyForInstall={isReadyForInstall} />
        <Routes>
          <Route path={routes.game} element={<Game />} />
          <Route exact path={routes.home} element={<Home />} />
          <Route path={routes.none} element={<Navigate to={routes.home} replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
