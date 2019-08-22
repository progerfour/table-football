import React from 'react';
import {Input} from 'antd';
import {Button,Block,Participant} from '../../components';
import './Admin.scss';
import {BrowserRouter as Router, Route,Link} from "react-router-dom";

const Admin = () => {
    return (
        <section className="auth">
            <div className="auth__content">
                <div className="auth__top">
                    <h2>Вход </h2>
                    <p>для администратора</p>
                </div>
                <Block>
                    <Input id='login' placeholder="Введите имя..." size="large"/>
                    <Input id='password' type='password' placeholder="Пароль..." size="large"/>
                    <Button className="" type="primary" size="large" >
                        Войти
                    </Button>            
                </Block>
            </div>
        </section>
    )
};

export default Admin;