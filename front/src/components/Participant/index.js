import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import './style.scss';

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
          name : props.name,
          img : props.img
      }
    }

    update = (name, img) => this.setState({
        name,
        img
    })

    render(){
      let { name, img, win, wasted } = this.state;
      return (
        <Row>
        <div className="participant">
          <Col span={10}>
          {(img != null) ? 
           <img className='participant__photo' src={img} alt="аватар участника"/> : <div></div>
          }
          </Col>
          <Col span={14}>
          <div className="participant__info">
            <div className="participant__name">Имя: {name}</div>
            <Stat win={win} wasted={wasted}></Stat>
          </div>
          
          </Col>
        </div>
        </Row>
      )
    }
  }

export {Participant};