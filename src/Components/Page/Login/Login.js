import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import $ from 'jquery'
import { useSelector, useDispatch } from 'react-redux'; 
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserKitchen } from "../../../Redux-store/Local-state";

import './Style.css';
import { LOGIN, HOME_PAGE_LOCAL } from "../../API/API";

export default function PAGE_LOGIN() {

    const history = useNavigate();
    const Dispatch = useDispatch();
    const { pathname, search, state } = useLocation();

    const GET_LOGIN = () => {

        let USER = document.getElementById('User').value;
        let PASS = document.getElementById('Pass').value;

        if(USER != '' && PASS != ''){

            let FORM_DATA = new FormData($('#Form-login')[0]);
            axios({
                method: "post",
                url: `${LOGIN.GET_LOGIN}`,
                data: FORM_DATA,
                headers: { "Content-Type": "multipart/form-data" }
            }).then(data => {

                var x = JSON.parse(data);

                if(x.result[0].sResultCmt === ''){

                    Dispatch(
                        UserKitchen({
                            USER_KITCHEN : x.result[0].sLocName
                        })
                    );

                    history(`${HOME_PAGE_LOCAL}`);

                }else{

                    alert("Warning!", "Incorrect User Name or Password", "warning");

                }
    
            
            
            });

        }else{

            alert('Please provide information');
        }
    }
    
    useEffect(() => {

    }, []);

    return (
        <div className="B">
            <div className="Box-left">

            </div>
            <div className="Box-right">
                <h1>Kitchen-Dashboard</h1>
                <br/>
                <form id="Form-login">
                    <div className="form-group">
                        <label>User</label>
                        <input type="text" className="form-control" id="User" name="User" />
                    </div>
                    <div className="form-group">
                        <label >Password</label>
                        <div className="input-group mb-2 mr-sm-2">
                            <input type="password" className="form-control" id="Pass" name="Pass"/>
                            <div className="input-group-prepend">
                                <div className="btn btn-success" onClick={() => GET_LOGIN()}>
                                  Login
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </div>


        </div>
    );
}