import React from 'react';
import {Input} from 'antd';
import {Button,Block} from '../../components';
import './Auth.scss';
import {Link} from "react-router-dom";

const Auth = () => {
    return (
        <section className="auth">
            <div className="auth__content">
                <div className="auth__top">
                    <h2>Чемпионат </h2>
                    <p>по настольному футболу</p>
                </div>
                <Block>
                    <Input placeholder="Введите имя..." size="large"/>
                    <Button className="button" type="primary" size="large">Зарегистрироваться как участник</Button>
                    <p className="center">или</p>
                    <Button className="" type="primary" size="large" >
                        <Link to="/match">Войти для просмотра</Link>
                    </Button>
                    <Link className="small center" to="/Admin">Администратор</Link>                   
                </Block>
            </div>
        </section>
    )
};

export default Auth;