import React, {useEffect} from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux"

import { PageButton, Button } from '../../components';
import './Match.scss';
import {Service} from '../../service';

import io from 'socket.io-client';

const socket = io('http://localhost:9998/');

const service = new Service();
const Match = (props) => {
 
  const {isAdmin, game} = props;
  let {
    avatar1,
    avatar2,
    id_player1,
    id_player2,
    isEnd,
    name1,
    name2,
    score_p1,
    score_p2
  } = game;

  useEffect (() => {
    socket.on('newMatchCreated',(data)=>{
      props.getMatch(data);
    });
    service.getCurrientMatch().then((response) => {
      props.getMatch(response.data);
    })
  }, []);

  const newMatch = () => {
    socket.emit('newMatch');
  }

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
            <img className="content__photo" key={id_player1} src={"images/"+avatar1} alt="аватар участника"/>
            <div className="content__name">{name1}</div>
          </div>
          <div className="content_score">
            <h1>{score_p1} : {score_p2}</h1>
          </div>
          <div className="content_second">
            <img className="content__photo" key={id_player2} src={"images/"+avatar2}  alt="аватар участника"/>
            <div className="content__name">{name2}</div>
          </div>
        </div>       
      </div>
      {(isAdmin) &&
      <Button  type="primary" size="large" onClick={newMatch}>Начать новый матч</Button>
      }
    </section>
    )
};

const mapStateToProps = (state) => {
    return {
        isAdmin : state.admin.isAdmin,
        game: state.match.game
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
      getMatch: (value) => {
          dispatch({
              type: 'MATH_LOADED',
              payload:value
          })
      }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Match);