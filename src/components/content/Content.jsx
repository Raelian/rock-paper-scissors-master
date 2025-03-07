import React, {useState, useEffect} from "react";
import "./Content.scss";

const GameButton = ({name, onPick}) => {
    return <button className={`btn ${name}-btn`} onClick={() => onPick(`${name}`)}></button>
}

const GameMode = ({mode, onPick}) => {
    const basicButtons = ["paper", "scissors", "rock"];
    const masterButtons = [...basicButtons, "lizard", "spock"];
    const buttons = mode === "Basic" ? basicButtons : masterButtons;

    return (
        <div className={`${mode.toLowerCase()}-select`}>
            {buttons.map((btn) => (
                <GameButton key={btn} name={btn} onPick={onPick}/>
            ))}
        </div>
    )
}

const ResultContainer = ({playerHand, gameMode, resetGame, setScore}) => {
    const [showResult, setShowResult] = useState(false);
    const [opponentHand, setOpponentHand] = useState(null)
    const [finalResult, setFinalResult] = useState("");

    const determineOpponentHand = (mode) => {
        const basicChoices = ["rock", "paper", "scissors"];
        const masterChoices = [...basicChoices, "lizard", "spock"];
        const choices = mode === "Basic" ? basicChoices : masterChoices;
        return choices[Math.floor(Math.random() * choices.length)];
    }

    useEffect(() => {
        const opponentTimeout = setTimeout(() => {
            const chosenMove = determineOpponentHand(gameMode);
            setOpponentHand(chosenMove);

            const resultTimeout = setTimeout(() => {
                const result = getResult(playerHand, chosenMove, gameMode);
                setFinalResult(result);
                setShowResult(true);
            }, 500);

            return () => clearTimeout(resultTimeout);
        }, 500);

        return () => clearTimeout(opponentTimeout);
    }, [gameMode]);

    useEffect(() =>{
        if(showResult) {
            setScore(prevScore => {
                if(finalResult === "YOU WIN") return prevScore + 1;
                if(finalResult === "YOU LOSE") return prevScore - 1;
                return prevScore;
            });
        }
    }, [showResult]);

    return (
        <div className="match-container">
            <div className="player-side">
                <p>YOU PICKED</p>
                <button className={`btn ${playerHand}-btn`} disabled={true}></button>
            </div>

            {showResult && (
                <div className="result-container">
                    <p>{finalResult}</p>
                    <button className="reset-btn" onClick={resetGame}>PLAY AGAIN</button>
                </div>
            )}

            <div className="opponent-side">
                <p>THE HOUSE PICKED</p>
                {opponentHand ? (
                    <button className={`btn ${opponentHand}-btn`} disabled={true}></button>
                ) : (
                    <button className="btn inactive"></button>
                )}
            </div>
        </div>
    );
}

const getResult = (player, opponent, game, score) => {
    if(player == opponent) return "DRAW";
    const basicWin = {
        rock: ["scissors"],
        paper: ["rock"],
        scissors: ["paper"]
    };

    const masterWin = {
        rock: ["scissors", "lizard"],
        paper: ["rock", "spock"],
        scissors: ["paper", "lizard"],
        lizard: ["spock", "paper"],
        spock: ["scissors", "rock"]
    };

    const winResult = game === "Basic" ? basicWin : masterWin;
    return winResult[player].includes(opponent) ? "YOU WIN" : "YOU LOSE";
}

const Content = ({gameMode, setGameScore, playerIsPlaying, setIfPlayerIsPlaying}) => {
    const [playerPicked, setPlayerHand] = useState(null);

    const startPlay = (hand) => {
        setPlayerHand(hand);
        setIfPlayerIsPlaying(true);
    }

    const resetGame = () => {
        setPlayerHand(null);
        setIfPlayerIsPlaying(false);
    }

    return (
        <main className="main-container">
            {playerIsPlaying ?  
            <ResultContainer 
                playerHand={playerPicked} 
                gameMode={gameMode} 
                resetGame={resetGame} 
                setScore={setGameScore}
            /> : 
            <GameMode mode={gameMode}  onPick={startPlay}/>}
        </main>
    )
}

export default Content;