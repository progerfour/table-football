import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { connect, useSelector } from "react-redux"

import { PageButton, Button } from '../../components';
import './Match.scss';
import {Service} from '../../service';

const Match = (props) => {
  const {isAdmin, game} = props;
  const {player1, player2, score} = game;

  useEffect (() => {
    
  });

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
            <img className="content__photo" src="images/1.jpg" alt="аватар участника"/>
            <div className="content__name">{player1.name}</div>
          </div>
          <div className="content_score">
            <h1>{score.player1} : {score.player2}</h1>
          </div>
          <div className="content_second">
            <img className="content__photo" src="images/2.jpg" alt="аватар участника"/>
            <div className="content__name">{player2.name}</div>
          </div>
        </div>       
      </div>
      {(isAdmin) &&
      <Button  type="primary" size="large">Начать новый матч</Button>
      }
    </section>
    )
};

const mapStateToProps = (state) => {
    console.log("authstate", state)
    return {
        isAdmin : state.admin.isAdmin,
        game: state.match.game
    };
}

export default connect(mapStateToProps)(Match);