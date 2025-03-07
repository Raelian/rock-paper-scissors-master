import React, {useState} from "react";
import "./Rules.scss";

const Rules = ({gameMode, setRulesVisible}) => {
    return (
        <div className="rules-container">
          <div className="rules-background">
            <p className="rules-title">RULES</p>
            <button className="close-btn" onClick={() => setRulesVisible(false)}></button>
            {gameMode === "Basic" ? 
              <img src="public/images/image-rules.svg" alt="Basic mode rules" className="rules-image"/> :
              <img src="public/images/image-rules-bonus.svg" alt="Master mode rules" className="rules-image"/>
            }
          </div>
        </div>
    )
};

export default Rules;