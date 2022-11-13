import React from "react";
import 'primeicons/primeicons.css';
import { game } from "../constant-text/text.js";

const Card = (props) => {
  const { name, score, selectedItem } = props;
  return (
    <div className="CardContainer">
      <p className="CardContainerName">{name.toUpperCase()}</p>
      <div className="ScoreContainer">
        <p className="ScoreTxt">{game.score}</p>
        <p className="ScoreNum">{score}</p>
      </div>
      <div className="SelectedItemContainer" >
        <p >{selectedItem.toUpperCase()}</p>
      </div>
    </div>
  );
}

export default Card;