import React, { Component } from 'react';
import {PageButton, Participant} from '../../components';
import { Row, Col } from 'antd';

import './ListOfPartisipants.scss';
import {Link} from "react-router-dom";
import { longStackSupport } from 'q';




const ListOfPartisipants = ({list}) => {
    return (
        <div>
            <h1 className="header">Участники</h1>
            <Link to="/Participants"><PageButton className="pageButton_right" image="group">Участники</PageButton></Link> 
            <Link to="/"><PageButton image="exit">Выход</PageButton></Link> 
            <Row type="flex" justify="center" gutter={16}>
                {list.map(item => (
                    <Col xs={18} lg={10}>
                        <Participant name={item.name} win={12} wasted={13} img={item.image}/>
                    </Col>
                ))}
                {/* <Col xs={18} lg={10}>
                    <Participant name="Катя" win={12} wasted={13} img="images/4.jpg"/>
                </Col>
                <Col xs={18} lg={10}>
                    <Participant name="Roma" img="images/1.png"/>
                </Col>
                <Col xs={18} lg={10}>
                    <Participant name="Лена" img="images/2.png"/>
                </Col>
                <Col xs={18} lg={10}>
                    <Participant name="Георгий" img="images/3.jpg"/>
                </Col>
                <Col xs={18} lg={10}>
                    <Participant name="Incognito" img="images/5.jpg"/>
                </Col>
                <Col xs={18} lg={10}>
                    <Participant name="Angelhack" img="images/6.jpg"/>
                </Col> */}
            </Row>
        </div>
    )
};




export default ListOfPartisipants;