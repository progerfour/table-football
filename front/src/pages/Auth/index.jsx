import React, {useState} from 'react';
import {Input} from 'antd';
import {Link, withRouter} from "react-router-dom";

import {Button,Block} from '../../components';
import './Auth.scss';
import {default as axios} from '../../axios';
import io from 'socket.io-client';

 
const socket = io('http://localhost:9998/');
socket.on('uiop',(data)=>{console.log("uiop done",data)});
socket.on('test1',(data)=>{console.log("test1 done",data)});
socket.on('updateScore',(data)=>{console.log("new score",data)});

const Auth = withRouter(({history}) => {
    const [isSending, setIsSending] = useState(false);
    const [nameUser, setNameUser] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const sendRequest = () => {
      // don't send again while we are sending
      if (isSending) return
      // update state
      setIsSending(true);
      // send the actual request
      axios
      .post(`${axios.defaults.baseURL}/users/create`,{"name": nameUser})
      .then(response => {
          const {code,errmsg} = response.data;
          if (code) {
              if (code === 11000){
                  setErrorMsg("Участник с таким именем уже существует");
              } else {
                console.log(errmsg);
              }
          } else {
            history.push('/match');
          }
      })  //axios.get(`${axios.defaults.baseURL}/users`); 
      // once the request is sent, update state again
      setIsSending(false);
    } // update the callback if the state changes

    const inputChange = event => {
        setNameUser(event.target.value);
        setErrorMsg("");
    }

    const sendRequest1 = () => {
        socket.emit("adminUpdateScore",{newScore:"bitch"});
    }
    return (
        <section className="auth">
            <div className="auth__content">
                <div className="auth__top">
                    <h2>Чемпионат </h2>
                    <p>по настольному футболу</p>
                </div>
                <Block>
                    <p className="p_error">{errorMsg}</p>
                    <Input placeholder="Введите имя..." size="large" onChange={inputChange}/>
                    <Button className="button" type="primary" size="large" disabled={isSending} onClick={sendRequest}>Зарегистрироваться как участник</Button>
                    <p className="center">или</p>
                    <Button className="" type="primary" size="large" >
                        <Link to="/match">Войти для просмотра</Link>
                    </Button>
                    <Link className="small center" to="/Admin">Администратор</Link>                   
                </Block>
            </div>
        </section>
    )
});

export default Auth;