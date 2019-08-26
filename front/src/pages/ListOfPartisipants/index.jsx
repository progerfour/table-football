import React from 'react';
import {PageButton, Participant} from '../../components';
import { Row, Col } from 'antd';

import './ListOfPartisipants.scss';
import {Link} from "react-router-dom";

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
            </Row>
        </div>
    )
};




export default ListOfPartisipants;