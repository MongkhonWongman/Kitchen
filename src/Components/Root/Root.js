import React, { useState, useEffect } from "react";
import $ from 'jquery';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'; 
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {MENU} from './Menu-data';
import './Style.css';
import { HOME_PAGE_LOCAL, INDEX_PAGE, ORDER_LIST } from "../API/API";
import { Count_order_by_bill, Bill_list, Bill_detail, PageKey, KitchenCod } from "../../Redux-store/Local-state";
import ICON_LOG_OUT from '../../img/Log-out.png';

export default function ROOT() {

    const { pathname, search, state } = useLocation();
    const Dispatch = useDispatch();
    const [MENU_LIST, SET_MENU_LIST] = useState([]);
    const history = useNavigate();

    const PAGE_KEY = useSelector((state) => state.LocalSate.PAGE_KEY);
    const KITCHEN_COD = useSelector((state) => state.LocalSate.KITCHEN_COD);

    const GET_MENU_LIST = () => {

        SET_MENU_LIST(MENU);

        if (sessionStorage.getItem('reloaded') != null) {
            Dispatch(
                KitchenCod({
                    KITCHEN_COD : 'K001'
                })
            );
        }

    }

    const GET_MENU = (to, key, title, icon, path) => {

        let KIT = $('#Data-kitchen').val();

        let DATA = {
            "KEY" : key, 
            "PAGE_TITLE" : title,
            "ICON" : icon,
            "NAME" : path,
            "KITCHEN" : KIT
        }
        // i.To_page,
        // i.Page_key, 
        // i.Tiele,
        // i.Icon,
        // i.Path_name 

        let MENU_PAGE = key;
        Dispatch(
            PageKey({
                PAGE_KEY : MENU_PAGE
            })
        );

        history(`${to}`, {state : DATA});
    
    }

    const GET_KITCHEN = (e) => {
        let KIT = $('#Data-kitchen').val();

        let KITCHEN = e.target.value;
        Dispatch(
            KitchenCod({
                KITCHEN_COD : KITCHEN
            })
        );

        for(let i = 0; i < MENU.length; i++){

            if(MENU[i].To_page === pathname){

                let x = MENU[i];
                let DATA = {
                    "KEY" : x.Page_key, 
                    "PAGE_TITLE" : x.Tiele,
                    "ICON" : x.Icon,
                    "NAME" : x.Path_name,
                    "KITCHEN" : KIT
                }

                history(`${x.To_page}`, {state : DATA});
            }

        }


        // GET_MENU()
        
        // GET_DATA(undefined, KITCHEN);

    }

    const LOGOUNT = () => {
        history(`${INDEX_PAGE}`);
    }

    useEffect(() => {

        GET_MENU_LIST();
    
    }, []);

    return (
        <div>

            <nav className="navbar navbar-expand-lg navbar-light Header-ber" >
                <span className="navbar-brand">
                    Kitchen Dashboard
                </span>

                <div style={{background:'', width: '100%'}}>
            
                    <div style={{float: 'right', }} className='row' >
                        
                        {PAGE_KEY == 'R' || PAGE_KEY == 'SC' ? (
                        null
                        ) : (
                            <div  className="Box-kitchen-select">
                                <select 
                                    className="form-control From-select-kitchen-index" 
                                    id="Data-kitchen"
                                    onChange={(e) => GET_KITCHEN(e)}
                                >
                                    <option value="K001" id="K001" >อิสลาม</option>
                                    <option value="K002" id="K002" >Danebury</option>
                                    <option value="K003" id="K003" >FoodHouse</option>
                                </select>
                            </div>
                        )}
                        &nbsp;&nbsp;
                        <span onClick={() => LOGOUNT()}>
                            <img src={ICON_LOG_OUT} style={{width: '70px'}} />
                        </span>
                        &nbsp;&nbsp;
                    </div>

                </div>

            </nav>

            <div className="wrapper">
                <nav id="sidebar">
                    <ul className="list-unstyled components">

                        {MENU_LIST.map((i, key) => ( 
                            <span key={key} style={{textAlign: 'start'}}>
                                <li className="nav-item">
                                    <a 
                                        onClick={() => 
                                            GET_MENU(
                                                i.To_page,
                                                i.Page_key, 
                                                i.Tiele,
                                                i.Icon,
                                                i.Path_name 
                                            )
                                        }
                                    >
                                        <img src={i.Icon} className="Icon-menu"/> &nbsp; {i.Tiele}
                                    </a>
                                </li>
                                <div className="Hr"></div>
                            </span>
                        ))}
    
                        <li className="Box-show-time">
                            <b><span id="ShowTime1" style={{marginRight: '7px'}}></span>
                            :
                            <span id="ShowTime2" style={{marginLeft: '7px'}}></span></b>
                        </li>

                    </ul>
                </nav>

                <div id="content">
                    <div className="Box-show-detail">

                        <Outlet />            

                    </div> 
                </div>
            </div>

        </div>
    );
}