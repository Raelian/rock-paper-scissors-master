import React, {useState} from "react";
import "./Footer.scss";

const Footer = ({setRulesVisible}) => {
    return (
        <div className="footer-container">
            <button className="rules-btn" onClick={() => setRulesVisible(true)}>RULES</button>
        </div>
    )
};

export default Footer;