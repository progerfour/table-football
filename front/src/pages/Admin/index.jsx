import React, {Component} from 'react';
import {Input} from 'antd';
import {connect} from "react-redux"
import {withRouter} from 'react-router-dom'
import {Button,Block} from '../../components';
import './Admin.scss';
import {Service} from '../../service';

var service = new Service();

class Admin extends Component {
    constructor() {
        super();
        this.login = "";
        this.password = "";
    }

    setLogin = (event) => {
        this.login = event.target.value;
    }

    setPassword = (event) => {
        this.password = event.target.value;
    }

    enter = () => {
        console.log("this.login,this.password",this.login,this.password)
        service.checkAdmin(this.login,this.password)
        .then(response => {
            console.log(response.data);
            const {status} = response.data;
            if (status === "OK") {
                console.log(status);
                this.props.adminEnter(true);
                this.props.history.push("/match");
            } else {
                console.log("error");
            }
        }) 
    }

    render(){
        return (
            <section className="auth">
                <div className="auth__content">
                    <div className="auth__top">
                        <h2>Вход </h2>
                        <p>для администратора</p>
                    </div>
                    <Block>
                        <Input id='login' placeholder="Введите имя..." size="large" onChange={this.setLogin}/>
                        <Input id='password' type='password' placeholder="Пароль..." size="large" onChange={this.setPassword} />
                        <Button className="" type="primary" size="large" onClick={this.enter} >
                            Войти
                        </Button>            
                    </Block>
                </div>
            </section>
        );
    }
};

const mapStateToProps = (state) => {
    console.log("mapStateToPropsstate", state)
    return {
        isAdmin : state.admin.isAdmin
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        adminEnter: (value) => {
            dispatch({
                type: 'ADMIN_UPDATE',
                payload:value
            })
        }
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Admin));