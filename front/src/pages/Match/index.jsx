import React from 'react';
import { PageButton, Button } from '../../components';
import './Match.scss';
import { Link } from "react-router-dom";

const Match = ({player1, player2, score, isAdmin}) => {
  isAdmin = true;
  return function(){
    return(
    <section className="match">
      <div className="match__top">
        <div className="header">
          <h1>Текущий матч</h1>
        </div>
        <Link to="/Participants"><PageButton className="pageButton_right" image="group">Участники</PageButton></Link> 
        <Link to="/"><PageButton image="exit">Выход</PageButton></Link> 
      </div>
      <div className="match__result">
        <div className="match__content">
          <div className="content_first">
            <img className="content__photo" src="images/1.png" alt="аватар участника"/>
            <div className="content__name">{player1.name}</div>
          </div>
          <div className="content_score">
            <h1>{score.player1} : {score.player2}</h1>
          </div>
          <div className="content_second">
            <img className="content__photo" src="images/2.png" alt="аватар участника"/>
            <div className="content__name">{player2.name}</div>
          </div>
        </div>
       
      </div>
      <Button  type="primary" size="large">Начать новый матч</Button>
    </section>
  )}
};

export default Match;
//https://icons8.ru/icon/10808/%D0%B7%D0%BD%D0%B0%D0%BA-%D0%B2%D1%8B%D1%85%D0%BE%D0%B4%D0%B0