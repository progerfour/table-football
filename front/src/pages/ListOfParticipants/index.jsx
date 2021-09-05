import React, {Component} from 'react';
import {PageButton, Participant} from '../../components';
import { Row, Col,Spin } from 'antd';
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import './ListOfParticipants.scss';
import { Service } from '../../service';
import { Header } from '../index';
var service = new Service();

class ListOfParticipants extends Component {
   
    componentDidMount(){
        service.getUsers().then( (items) => {
        console.log("getUsers", items.data);
        this.props.usersLoaded(items.data);
        });
    }

    render(){
        const {ListOfParticipants, loading} = this.props;
        if (loading) {
            return <Spin tip="Loading..." className="load"/>
        }
        return (
            <>
                <Header page="participants"/>
                <h1 className="header">Участники</h1>
                <Row type="flex" justify="center" gutter={16}>
                    {ListOfParticipants.map(item => (
                        <Col xs={18} lg={10} key={item._id} >
                            <Participant item={item}/>
                        </Col>
                    ))}
                </Row>
            </>
        )
    }
};

const mapStateToProps = (state) => {
    console.log("mapStateToPropsstate", state)
    return {
        ListOfParticipants : state.users.items,
        loading : state.users.loading
    };
}

const mapDispatchToProps = {
        usersLoaded: (newUsers) => ({
                type: 'USER_LOADED',
                payload:newUsers
            })
    
}
export default connect(mapStateToProps,mapDispatchToProps)(ListOfParticipants);