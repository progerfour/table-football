import React, {useEffect,useState} from 'react';
import {PageButton, Participant} from '../../components';
import { Row, Col } from 'antd';
import {Link} from "react-router-dom";

import './ListOfPartisipants.scss';
import {default as axios} from '../../axios';

const ListOfPartisipants = () => {
    const [list, setList] = useState([]);

    //вызывется при встраивание элемента в dom
    useEffect(() => {
        axios.get(`${axios.defaults.baseURL}/users`)
        .then(res => {
            console.log(res);
          setList(res.data);

        });
    }
    , []); 

    return (
        <div>
            <h1 className="header">Участники</h1>
            <Link to="/match"><PageButton className="pageButton_right" image="group">Матч</PageButton></Link> 
            <Link to="/"><PageButton image="exit">Выход</PageButton></Link> 
            <Row type="flex" justify="center" gutter={16}>
                {list.map(item => (
                    <Col xs={18} lg={10} key={item._id} >
                        <Participant _id={item._id} name={item.name} win={12} wasted={13} img={item.avatar}/>
                    </Col>
                ))}
            </Row>
        </div>
    )
};






export default ListOfPartisipants;