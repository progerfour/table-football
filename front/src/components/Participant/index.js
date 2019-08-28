import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'antd';
import {connect} from "react-redux"

import './style.scss';
import {Service} from '../../service';

var service = new Service();

const Stat = ({win,wasted}) => {
  return (
      <div style={{ padding: '0px' }}>
      <Row gutter={5} style={{ color: '#3f8600' }}>
        Побед: {win}
      </Row>
      <Row gutter={5} style={{ color: '#cf1322' }}>
        Проигрышей: {wasted}
      </Row>
      </div>
  )
};

class Participant extends Component {
    static propTypes = {
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        img: PropTypes.string,
        win:PropTypes.number,
        wasted:PropTypes.number
    }
    
    static defaultProps = {
        name: "unknown",
        img : "img.jpg"
    }

    constructor(props){
      super(props)
      this.state = {
          _id:props._id,
          name : props.name,
          img : props.img
      }
      this.deleteUser = this.deleteUser.bind(this);   
    }

    update = (name, img) => this.setState({
        name,
        img
    })

    deleteUser (event) {
      console.log(this.state._id);
      service.deleteUser(this.state._id)
      .then(response => {
          console.log(response);
          service.getUsers().then( (items) => {
            this.props.usersLoaded(items.data);
            });
      });
    }

    render(){
      let { _id, name, img, win, wasted } = this.state;   
      return (
        <Row>
        <div key={_id} className="participant">
          <Col span={10}>
          {(img != null) ? 
           <img className='participant__photo' src={"images/" + img} alt="аватар участника"/> : <div></div>
          }
          </Col>
          <Col span={14}>
          <div className="participant__info">
            <div className="participant__name">Имя: {name}</div>
            <Stat win={win} wasted={wasted}></Stat>
            <Button icon="delete" onClick={this.deleteUser}></Button>
          </div>
          </Col>
        </div>
        </Row>
      )
    }
  }

 const mapStateToProps = (state) => {
    console.log("mapStateToPropsstate", state)
    return {
        isAdmin : state.isAdmin,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        usersLoaded: (newUsers) => {
            dispatch({
                type: 'USER_LOADED',
                payload: newUsers
            })
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Participant); 