import React, {useState} from "react";
import "./Rules.scss";
import basic_rules from "/images/image-rules.svg";
import master_rules from "/images/image-rules-bonus.svg";

const Rules = ({gameMode, setRulesVisible}) => {
    return (
        <div className="rules-container">
          <div className="rules-background">
            <p className="rules-title">RULES</p>
            <button className="close-btn" onClick={() => setRulesVisible(false)}></button>
            {gameMode === "Basic" ? 
              <img src={basic_rules} alt="Basic mode rules" className="rules-image"/> :
              <img src={master_rules} alt="Master mode rules" className="rules-image"/>
            }
          </div>
        </div>
    )
};

export default Rules;