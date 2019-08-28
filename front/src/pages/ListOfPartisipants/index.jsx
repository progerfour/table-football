import React, {Component} from 'react';
import {PageButton, Participant} from '../../components';
import { Row, Col,Spin } from 'antd';
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import './ListOfPartisipants.scss';
import {Service} from '../../service';

var service = new Service();

class ListOfPartisipants extends Component {
   
    componentDidMount(){
        service.getUsers().then( (items) => {
        console.log("getUsers", items.data);
        this.props.usersLoaded(items.data);
        });
    }

    render(){
        const {listOfPartisipants, loading} = this.props;
        console.log(" this.props", this.props);
        if (loading) {
            return <Spin tip="Loading..." className="load"/>
        }
        return (
            <div>
                {console.log("listOfPartisipants",listOfPartisipants)}
                <h1 className="header">Участники</h1>
                <Link to="/match"><PageButton className="pageButton_right" image="group">Матч</PageButton></Link> 
                <Link to="/"><PageButton image="exit">Выход</PageButton></Link> 
                <Row type="flex" justify="center" gutter={16}>
                    {listOfPartisipants.map(item => (
                        <Col xs={18} lg={10} key={item._id} >
                            <Participant _id={item._id} name={item.name} win={12} wasted={13} img={item.avatar}/>
                        </Col>
                    ))}
                </Row>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    console.log("mapStateToPropsstate", state)
    return {
        listOfPartisipants : state.users.items,
        loading : state.users.loading
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        usersLoaded: (newUsers) => {
            dispatch({
                type: 'USER_LOADED',
                payload:newUsers
            })
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ListOfPartisipants);