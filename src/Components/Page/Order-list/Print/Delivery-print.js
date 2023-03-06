import React, { useState, useEffect } from "react";
import axios from 'axios';
import QRCode from "react-qr-code";
import { useSelector, useDispatch } from 'react-redux'; 
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import './Style.css';

export default function DELIVERY_BILL() {

    const Dispatch = useDispatch();
    const history = useNavigate();
    const { pathname, search, state } = useLocation();

    const BILL_ID = useSelector((state) => state.LocalSate.BILL_LIST_PRINT);
    const BILL_DETAIL = useSelector((state) => state.LocalSate.BILL_DETAIL_PRINT);
    const AMOUNT_BILL = useSelector((state) => state.LocalSate.AMOUNT_BILL_INF);

    let HEADER_PRINT;
    let FOOT_PRINT;
    let FOOT_ALL_PRINT;

    useEffect(() => {


    }, []);

    return (
        <div>
            {BILL_ID.map((i1, key1) => (
                <div key={key1}>

                    {/* BILL QR */}
                    {BILL_DETAIL.map((i, key) => {
    
                        HEADER_PRINT = (
                            <div key={key} className="header" style={{fontSize: '14px'}}>
                                <b>
                                    ใบเสร็จรับเงิน
                                </b>
                                <br/>
    
                                <span style={{fontWeight: '700' }}>
                                    Room : {i.PirWrdCod}-{i.PirRoomCod}-{i.PirBedCod}
                                    &nbsp; HN : {i.PirHn}
                                </span>
                                <br/>
    
                                <span style={{float: 'left'}}>
                                    NAME : {i.PirUserName}
                                    <br/>
    
                                    <span style={{float: 'left'}}>
                                    FOOD ALLERGIES : -
                                    </span>
                                </span>
    
                                <span style={{float: 'right', }}>
                                    NO.
                                    <br/>
                                    <span style={{float: 'right'}}>
                                    AGE : {i.PirUserAge}
                                    </span>
                                </span>
                            </div> 
                        );
    
                        FOOT_PRINT = (
                            <div key={key} className="page-footer" style={{fontSize: '14px'}}>
                                <table>
                                    <tbody >
                                        <tr >
                                            <td colSpan="2">
                                                <span >
                                                    เวลาสั่งอาหาร : {i.PirOdrDte} | {i.PirOdrTme}
                                                    <br />
                                                    นักโภชนาการ : 
                                                </span>
                                            </td>

                                            <td  style={{  textAlign: "right"}}>
                                                <span>
                                                    ครัว : 
                                                    <br />
                                                    ประเภท : อาหารตามสั่ง
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div> 
                        );

                        FOOT_ALL_PRINT = (
                            <div key={key} className="page-footer" style={{fontSize: '14px'}}>
                                <table>
                                    <tbody >
                                        <tr >
                                            <td  style={{  textAlign: "right"}}>
                                                {AMOUNT_BILL.map((i2, key2) => (
                                                    <span key={key2}>
                                                        รวม : {i2.SumQty} &nbsp;&nbsp;&nbsp; {i2.SumPrice} 
                                                    </span>
                                                ))}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div> 
                        );
    
      
                    })}
    
                    {/* ALL ORDER */}
                    <div className='Box-bill-print'>
                        <div >
                            {HEADER_PRINT}
                        </div>

                        <div style={{paddingTop: '50px', width: '100%'}}>
                            {BILL_DETAIL.map((i2, key2) => {
                                return(
                                    <table key={key2}>
                                        <tbody >
                                        <tr >
                                            <td style={{width:'360px', border: 'none'}}>
                                                <span style={{ fontSize: "13px", color: 'black'}}>
                                                    <b>{i2.FodMnuNamThai}</b>
                                                </span>
                                            </td>
            
                                            <td style={{ fontSize: "13px" }}>
                                                <b>{i2.PirOdrQty}</b>
                                                &nbsp;&nbsp; &nbsp;&nbsp;
                                            </td>
            
                                            <td style={{ textAlign: "right" }}>
                                                <span style={{ fontSize: "13px" }}>
                                                    <b>{i2.FodPrcNum * i2.PirOdrQty}</b>
                                                </span>
                                            </td>
                                        </tr>
        
                                        <tr>
                                            <td colSpan="3">
                                                <p style={{ fontSize: "13px", color: 'black' }}>
                                                    &nbsp; {i2.PirOdrCmt}
                                                </p>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                           
                                );
                            })}
                            <div>
                                {FOOT_ALL_PRINT}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}