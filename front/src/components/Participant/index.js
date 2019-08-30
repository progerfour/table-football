import React, {Component} from 'react';
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

    constructor(props){
      console.log("propsPartisipant",props)
      super(props)
      
       this.state = {
          _id:props.item._id,
          name : props.item.name,
          img : props.item.avatar,
          isAdmin: props.item.isAdmin,
          win : props.item.win,
          wasted : props.item.wasted,
          isPlayer : props.item.isPlayer
      }
      console.log("id",this.state._id);
      this.deleteUser = this.deleteUser.bind(this);   
    }

    update = (name, img) => this.setState({
        name,
        img
    })

    deleteUser (event) {
      service.deleteUser(this.state._id)
      .then(response => {
          console.log(response);
          service.getUsers().then( (items) => {
            this.props.usersLoaded(items.data);
            });
      });
    }

    render(){
      let { _id, name, img, win, wasted, isAdmin, isPlayer } = this.state; 
      const classForPhoto = isPlayer ? "participant__photo" : "participant__photo noPlay";
      return (
        <Row>
        <div key={_id} className="participant">
          <Col span={10}>
          {(img != null) && 
           <img className={classForPhoto} src={"images/" + img} alt="аватар участника"/> 
          }
          </Col>
          <Col span={14}>
          <div className="participant__info">
            <div className="participant__name">Имя: {name} {!isPlayer && "[выбыл]"} </div>
            <Stat win={win} wasted={wasted}></Stat>
            {(isAdmin) &&
              <Button icon="delete" onClick={this.deleteUser}></Button>
            }
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
        isAdmin : state.admin.isAdmin,
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