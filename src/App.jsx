import React, {useState, useEffect} from 'react';
import './App.scss'
import Header from './components/header/Header';
import Content from './components/content/Content';
import Footer from './components/footer/Footer';
import Rules from './components/rules/Rules';

function App() {
  const [gameMode, setGameMode] = useState("Basic");
  const [playerIsPlaying, setIfPlayerIsPlaying] = useState(false);
  const [rulesVisible, setRulesVisible] = useState(false);
  const [gameScore, setGameScore] = useState(() => {
    const savedScore = localStorage.getItem("score");
    return savedScore ? parseInt(savedScore, 10) : 20;
  });

  useEffect(() => {
    localStorage.setItem("score", gameScore);
  }, [gameScore]);

  return (
    <div className="app-container">
      <Header gameMode={gameMode} setGameMode={setGameMode} gameScore={gameScore} setGameScore={setGameScore} playerIsPlaying={playerIsPlaying}/>
      <Content gameMode={gameMode} setGameMode={setGameMode} setGameScore={setGameScore} playerIsPlaying={playerIsPlaying} setIfPlayerIsPlaying={setIfPlayerIsPlaying}/>
      <Footer setRulesVisible={setRulesVisible}/>
      {rulesVisible && <Rules gameMode={gameMode} setRulesVisible={setRulesVisible}/>}
    </div>
  )
}

export default App
