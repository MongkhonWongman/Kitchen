import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'; 
import { Link, Outlet, useLocation } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';

import {Bill_list, Bill_detail, Amount_bill_inf, Bill_list_pritnt, Bill_detail_pritnt } from "../../../Redux-store/Local-state";

import './Style.css';
import { ORDER_LIST } from "../../API/API";
import CALL_PRINT from './Print/Call-print';


export default function STATUS_PROCESS() {

    const [SET_QTY, SET_SET_QTY] = useState([]);
    const [BILL_DETAIL_PRINT, SET_BILL_DETAIL_PRINT] = useState([]);

    const [BILL_ID_LIST, SET_BILL_ID_LIST] = useState([]);
    const [BILL_DETAIL, SET_BILL_DETAIL] = useState([]);

    const BILL_QTY = useSelector((state) => state.LocalSate.BILL_QTY);
    const KITCHEN_COD = useSelector((state) => state.LocalSate.KITCHEN_COD);
    // const BILL_ID = useSelector((state) => state.LocalSate.BILL_LIST);
    // const BILL_DETAIL = useSelector((state) => state.LocalSate.BILL_DETAIL);
    // const PAGE_KEY = useSelector((state) => state.LocalSate.PAGE_KEY);

    const Dispatch = useDispatch();
    const { pathname, search, state } = useLocation();
    const componentRef = useRef();

    const GET_DATA = (id1, id2) => {

        axios.get(`${ORDER_LIST.COUNT_ORDER}?Stt=${state.KEY}&Kitchen=${KITCHEN_COD}`).then(data => {
            SET_SET_QTY(data.data[0].QTY1);
        });

        axios.get(`${ORDER_LIST.BILL_ID}?Stt=${state.KEY}&Kitchen=${KITCHEN_COD}`).then(data => {
            SET_BILL_ID_LIST(data.data);
        });

        axios.get(`${ORDER_LIST.BILL_DETAIL}?Stt=${state.KEY}&Kitchen=${KITCHEN_COD}`).then(data => {
            SET_BILL_DETAIL(data.data);
        });
    }

    const UPDATE_CALL = (id1, id2, stt) => {
        axios.get(`${ORDER_LIST.UPDATE_ORDER_STATUS}?ID1=${id1}&ID2=${id2}&Stt=${stt}`).then(data => {
            GET_DATA();
        });
    }

    useEffect(() => {

        GET_DATA();
   
    }, []);

    return (
        <div>
            <div className={`Show-title-and-qty-process`}>
      
                <div className="Box-icon-call">
                    <img src={state.ICON} className="Icon-menu-call" />
                </div>

                <div className={`Ram-box-text-title-call`} style={{width: '100%'}}>
                    <div className={`Text-title-process`} style={{width: '100%'}}>
                        <span >
                            {state.PAGE_TITLE}
                            </span>
                        <div style={{float: 'right'}} className="Text-qty">
                            <b>
                                {SET_QTY}
                                </b> &nbsp;&nbsp;Orders
                        </div>
                    </div>
                </div>
            </div>

            <div style={{width: '100%', height: '70vh',overflow: 'hidden'}}>
                <table className="table table-bordered" style={{fontSize: '13px', width: '100%'}} >
                    <thead style={{fontSize: '13px'}}>
                        <tr>
                        <th scope="col" >
                            Order No.
                        </th>
                        <th scope="col" >
                            Time / Room
                        </th>
                        <th scope="col" >
                            รายการ
                        </th>
                        <th scope="col" >
                            รายละเอียด
                        </th>
                        <th scope="col" >
                            ราคา
                        </th>
                        <th scope="col" >
                            จำนวน
                        </th>
                        <th scope="col" >
                            Status
                        </th>
                        </tr>
                    </thead>

                    <tbody>
                        {BILL_ID_LIST.map((i, key) => (
                            <tr key={key} >

                                <td>
                                    {i.PirBillCod1} - {i.PirBillCod2}
                                </td>
                                <td>
                                    {i.PirOdrTme} / {i.PirWrdCod} - {i.PirRoomCod} - {i.PirBedCod}
                                </td>
                                <td>
                                    {BILL_DETAIL.map((i2, key) => {
                                        if(i2.PirBillCod2 === i.PirBillCod2){
                                            return(
                                                <b key={key}>
                                                    <div className="Box-text">
                                                        <div className="text-name-detail" >{i2.FodMnuNamThai}</div>
                                                        <span className="tooltiptext">{i2.FodMnuNamThai}</span>
                                                    </div>
                                                    <br/>
                                                </b>
                                            );

                                        }
                                    })}
                                </td>

                                <td>
                                    {BILL_DETAIL.map((i2, key) => {
                                        if(i2.PirBillCod2 === i.PirBillCod2){
                                            return(
                                                <b key={key}>
                                                    <div className="Box-text">
                                                        <div className="text-com-detail" >{i2.PirOdrCmt}</div>
                                                        <span className="tooltiptext">{i2.PirOdrCmt}</span>
                                                    </div>
                                                    <br/>
                                                </b>
                                            );

                                        }
                                    })}
                                </td>

                                <td>
                                    {BILL_DETAIL.map((i2, key) => {
                                        if(i2.PirBillCod2 === i.PirBillCod2){
                                            return(
                                                <b key={key}>
                                                    <div className="Box-text">
                                                        <div className="text-com-detail" >{i2.FodPrcNum}</div>
                                                        <span className="tooltiptext">{i2.FodPrcNum}</span>
                                                    </div>
                                                    <br/>
                                                </b>
                                            );

                                        }
                                    })}
                                </td>

                                <td>
                                    {BILL_DETAIL.map((i2, key) => {
                                        if(i2.PirBillCod2 === i.PirBillCod2){
                                        
                                            return(
                                                <b key={key}>
                                                    <div className="Box-text">
                                                        <div className="text-qty-detail" >
                                                            {i2.PirOdrQty}
                                                        </div>
                                                    </div>
                                                    <br/>
                                                </b>
                                            );
                                        }
                                    })}
                                </td>

                                <td>
                                    <b>กำลังปรุง</b>
                                    &nbsp;&nbsp;&nbsp;
                                    <button onClick={() => UPDATE_CALL(i.PirBillCod1, i.PirBillCod2, 'C')} className="btn btn-outline-secondary" >
                                        <b>กลับไปรับออเดอร์</b>
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
         
         <div style={{display: 'none'}}>
            <div ref={componentRef}>
                {/* <CALL_PRINT /> */}
            </div>
         </div>

        </div>
    );
}