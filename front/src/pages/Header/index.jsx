
import React from 'react';
import { Link } from "react-router-dom";
import io from 'socket.io-client';
import { connect } from "react-redux"

import {ReactComponent as ExitIcon} from "./exit.svg";
import './Header.scss';

const socket = io('http://localhost:9998/');


const Header = ({ page, isAdmin }) => {
    const newMatch = () => {
        socket.emit('newMatch');
    }
    return (<>
        <div className="wrapper_header">
            <div className={`header ${isAdmin ? '' : 'header--common'}`}>
                {isAdmin && (<button className="header_create-match" onClick={newMatch}>
                    <div className="header_title">Начать новый матч</div>
                    <svg className="header_create-match_svg">
                        <use className="header_create-match_plus" xlinkHref="./plus_btn.svg#plus"></use>
                        <use className="header_create-match_plus--hover" xlinkHref="./plus_btn.svg#plus_hover"></use>
                    </svg>
                </button>)}
                <ul className="header_items">
                    <li className="header_item">
                        <Link to="/match">
                            <div className="header_title">Матч</div>
                            <div className={`header_line ${page === 'match' ? 'current' : ''} `}></div>
                            <svg className={`header_mobile ${page === 'match' ? 'header_mobile--current' : ''}`}>
                                <use className="header_mobile--main" xlinkHref="./match_btn.svg#match"></use>
                                <use className="header_mobile--chosen" xlinkHref="./match_btn.svg#match_chosen"></use>
                            </svg>
                        </Link>
                    </li>
                    <li className="header_item">
                        <Link to="/participants">
                            <div className="header_title">Участники</div>
                            <div className={`header_line ${page === 'participants' ? 'current' : ''} `}></div>
                            <svg className={`header_mobile ${page === 'participants' ? 'header_mobile--current' : ''}`}>
                                <use className="header_mobile--main" xlinkHref="./participants_btn.svg#participants"></use>
                                <use className="header_mobile--chosen" xlinkHref="./participants_btn.svg#participants_chosen"></use>
                            </svg>
                        </Link>
                    </li>
                    {isAdmin && (<li className="header_pseudo_item"></li>)}
                    <li className="header_item--inactive" >
                        <div className="header_title">Таблица</div>
                        <svg className="header_mobile">
                            <use className="header_mobile--main" xlinkHref="./table_btn.svg#table"></use>
                            <use className="header_mobile--chosen" xlinkHref="./table_btn.svg#table_chosen"></use>
                        </svg>
                    </li>
                    <li className="header_item">
                        <Link to="/">
                            <div className="header_title">Выход</div>
                            <div className="header_line"></div>
                            <ExitIcon className="header_mobile"/> 
                        </Link>
                    </li>
                    
                </ul>
            </div>
        </div>
    </>)
};

const mapStateToProps = (state) => {
    return {
        isAdmin : state.admin.isAdmin
    };
}

export default connect(mapStateToProps, null)(Header);