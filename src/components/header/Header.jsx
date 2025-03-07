import React from "react";
import './Header.scss';

const BasicLogo = () => {
    return (
        <img src="/../../images/logo.svg" alt="Rock-Paper-Scissors logo" className="basic-logo"/>
    )
}

const MasterLogo = () => {
    return (
        <img src="/../../images/logo-bonus.svg" alt="Rock-Paper-Scissors-Lizard-Spock logo" className="master-logo"/>
    )
}

const resetGameAndScore = (mode, setGameMode, setGameScore) => {
    setGameMode(mode);
    setGameScore(0);
    localStorage.setItem("score", 0);
}

const Header = ({gameMode, setGameMode, gameScore, setGameScore, playerIsPlaying}) => {
    return (
        <header className="header-container">
            <div className="logo-container">
                {gameMode === "Basic" ? <BasicLogo /> : <MasterLogo />}
            </div>
            <ul className="game-mode-container">
                <li>
                    <button 
                        className={`game-mode-btn ${gameMode === "Basic" ? "active-btn" : ""}`} 
                        onClick={() => resetGameAndScore("Basic", setGameMode, setGameScore)} 
                        disabled={playerIsPlaying}
                    >
                        Basic
                    </button>
                </li>
                <li>
                    <button 
                        className={`game-mode-btn ${gameMode === "Master" ? "active-btn" : ""}`} 
                        onClick={() => resetGameAndScore("Master", setGameMode, setGameScore)}
                        disabled={playerIsPlaying}
                    >
                        Master
                    </button>
                </li>
            </ul>
            <div className="score-container">
                <p className="score-header">SCORE</p>
                <p className="score-count">{gameScore}</p>
            </div>
        </header>
    )
}

export default Header;
