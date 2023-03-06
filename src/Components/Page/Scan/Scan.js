import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'; 
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

// import { HOME_PAGE_LOCAL, ORDER_LIST } from "../API/API";
// import { Bill_list, Bill_detail, PageKey, KitchenCod } from "../../Redux-store/Local-state";

export default function MAIN_SHOW() {

    const Dispatch = useDispatch();
    const [MENU_LIST, SET_MENU_LIST] = useState([]);
    const history = useNavigate();

    const PAGE_KEY = useSelector((state) => state.LocalSate.PAGE_KEY);
    const KITCHEN_COD = useSelector((state) => state.LocalSate.KITCHEN_COD);
    const KITCHEN_NAME = useSelector((state) => state.LocalSate.KITCHEN_NAME);

    useEffect(() => {

    
    }, []);

    return (
        <div>

            SCAN

        </div>
    );
}