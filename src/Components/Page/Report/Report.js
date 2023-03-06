import React, { useState, useEffect, useRef } from "react";
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'; 
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';

import './Style.css';
import { REPORT } from "../../API/API";
// import { Bill_list, Bill_detail, PageKey, KitchenCod } from "../../Redux-store/Local-state";
import DateRangePicker from "rsuite/DateRangePicker";
import { DateConvert, PeriodConvert } from "../../Function-center/Function-center";
export default function MAIN_SHOW() {

    const history = useNavigate();
    const Dispatch = useDispatch();

    const [PERIOD, SET_PERIOD] = useState({PERIOD_START: '00:00', PERIOD_END: '00:00'});
    const [BILL_LIST, SET_BILL_LIST] = useState([]);
    const [REPORT_TYPE, SET_REPORT_TYPE] = useState([]);
    const [BILL_DETAIL, SET_BILL_DETAIL] = useState([]);
    const componentRef = useRef();

    const PAGE_KEY = useSelector((state) => state.LocalSate.PAGE_KEY);
    const KITCHEN_COD = useSelector((state) => state.LocalSate.KITCHEN_COD);
    const KITCHEN_NAME = useSelector((state) => state.LocalSate.KITCHEN_NAME);

    const REPORT_STYLE = `

    @page {
        @bottom-right {
            content: 'Page ' counter(page) ' of ' counter(pages);
        }
    }

        @media print {
            @page {
                page-break-after: always;
                size: A4 landscape;
            }


        }
    `;

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const GET_REPORT = () => {

        let TYPE = document.getElementById('Type').value;
        let PERIOD = document.getElementById('period').value;
        let DATE_START = document.getElementById('Date-start').value;
        let DATE_END = document.getElementById('Date-end').value;

        let CONVERT_DATE_START = DateConvert(DATE_START)[0].server;
        let CONVERT_DATE_END = DateConvert(DATE_END)[0].server;
        let CONVERT_PERIOD = PeriodConvert(PERIOD);
    
        SET_REPORT_TYPE(TYPE);
        SET_PERIOD({...PERIOD, PERIOD_START: CONVERT_PERIOD.PERIOD_START_SHOW, PERIOD_END: CONVERT_PERIOD.PERIOD_END_SHOW});
           
        const request_config = {
            params: {
                Type: TYPE,
                DateStart: CONVERT_DATE_START,
                DateEnd: CONVERT_DATE_END,
                PeriodStart: CONVERT_PERIOD.PERIOD_START_SERVER,
                PeriodEnd: CONVERT_PERIOD.PERIOD_END_SERVER,
            },
        };
    
        axios.get(`${REPORT.BILL_LIST}`, request_config).then(data => {
            SET_BILL_LIST(data.data);
        });

        axios.get(`${REPORT.BILL_DETAIL}`, request_config).then(data => {
            SET_BILL_DETAIL(data.data);
        });
        
    }

    useEffect(() => {
        GET_REPORT();
    }, []);

    return (
        <div style={{padding: '0 3px 0 3px'}}>

            <div >
                <h3>Report</h3> 

                <form style={{padding: '0 14px 0 14px'}}>
                    <div className="form-group row">

                        {/* <div className="form-group mr-4">
                            <label >ครัว</label>
                            <div >
                                <select 
                                    className="form-control From-select-kitchen-index"
                                    onChange={(e) => GET_REPORT(e)}
                                    id='Type'
                                >
                                    <option value="All" >ทั้งหมด</option>
                                    <option value="K001" >ทั้งหมด</option>
                                    <option value="K002" >อาหารคนไข้</option>
                                    <option value="K003" >อาหารญาติ</option>
                                </select>
                            </div>
                        </div> */}

                        <div className="form-group mr-4">
                            <label >ประเภท report</label>
                            <div >
                                <select 
                                    className="form-control From-select-kitchen-index"
                                    onChange={(e) => GET_REPORT(e)}
                                    id='Type'
                                >
                                    <option value="A" >ทั้งหมด</option>
                                    <option value="P" >อาหารคนไข้</option>
                                    <option value="R" >อาหารญาติ</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group mr-1">
                            <label>เริ่มต้น</label>
                            <br/>
                            <input 
                                type='date' 
                                className="form-control"
                                defaultValue={DateConvert(new Date())[0].show}
                                format="dd-MM-yyyy"
                                id="Date-start"
                                onChange={(e) => GET_REPORT(e)}
                            />
                        
                        </div>

                        <div className="form-group mr-4">
                            <label>สิ้นสุด</label>
                            <br/>
                            <input 
                                type='date' 
                                className="form-control"
                                defaultValue={DateConvert(new Date())[0].show}
                                format="dd-MM-yyyy"
                                id="Date-end"
                                onChange={(e) => GET_REPORT(e)}
                            />
                            
                        </div>

                        <div className="form-group mr-4">
                            <label >ช่วงเวลา &nbsp;{PERIOD.PERIOD_START} - {PERIOD.PERIOD_END}</label>
                            <div >
                                <select 
                                    className="form-control"
                                    id="period"
                                    onChange={(e) => GET_REPORT(undefined, undefined ,e)}
                                >
                                    <option value="All" >ทุกช่วงเวลา</option>
                                    <option value="Morning" >เช้า</option>
                                    <option value="Afternoon" >กลางวัน</option>
                                    <option value="Evening" >เย็น</option>
                                </select>
                                
                            </div>
                        </div>

                        <div className="form-group ">
                            <label style={{color:'#FFFFFF'}}>*</label>
                            <div >
                                <button type="button" className="btn btn-success" id='print-button' onClick={() => handlePrint()}>Print</button>
                            </div>
                        </div>

                    </div>
                </form>
         
            </div>
            

            <div>
            {(() => {

                let DATA_TABLE = (
                    <>
                       {BILL_LIST.map((i, key) => (
                            <tr key={key} style={{fontSize: '14px'}}>
                                <td>
                                    {i.PirOdrDte}
                                </td>
                                <td>
                                    {i.PirBillCod1} - {i.PirBillCod2}
                                </td>
                                <td>
                                    {i.PirWrdCod}-{i.PirRoomCod}-{i.PirBedCod}
                                </td>
                                <td>
                                    {i.PirHn}
                                </td>

                                <td >
                                    {BILL_DETAIL.map((i2, key) => {
                                        if(i2.PirBillCod2 === i.PirBillCod2){
                                            return(
                                                <b key={key}>
                                                    <div className="Box-text">
                                                        - {i2.FodMnuNamThai}
                                                    </div>
                                                    <br/>
                                                </b>
                                            );
                                        }
                                    })}
                                
                                </td>

                                <td style={{textAlign: 'center'}}>
                                    {BILL_DETAIL.map((i2, key) => {
                                        if(i2.PirBillCod2 === i.PirBillCod2){
                                            return(
                                                <b key={key}>
                                                    <div className="Box-text">
                                                        <div >{i2.PirOdrQty}</div>
                                                    </div>
                                                    <br/>
                                                </b>
                                            );
                                        }
                                    })}
                                </td>

                                <td style={{textAlign: 'center'}}>
                                    {BILL_DETAIL.map((i2, key) => {
                                        if(i2.PirBillCod2 === i.PirBillCod2){
                                            return(
                                                <b key={key}>
                                                    <div className="Box-text">
                                                        {i2.FodPrcNum}
                                                    </div>
                                                    <br/>
                                                </b>
                                            );
                                        }
                                    })}
                                </td>

                                <td style={{textAlign: 'center'}}>
                                    {BILL_DETAIL.map((i2, key) => {
                                        if(i2.PirBillCod2 === i.PirBillCod2){
                                            return(
                                                <b key={key}>
                                                    <div className="Box-text">
                                                        <div >{i2.PirOdrQty*i2.FodPrcNum}</div>
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
                                                        <div >{i2.PirOdrCmt}</div>
                                                    </div>
                                                    <br/>
                                                </b>
                                            );
                                        }
                                    })}
                                </td>
                                

                            </tr>
                        ))}
                </>
                )

                let TABLE_DETAIL = (
                    <table className="table table-bordered landscape"  >
                        <thead className="SHOW" style={{fontSize: '14px'}}>
                            <tr className="header">
                                <th scope="col" >Date</th>
                                <th scope="col">Order No.</th>
                                <th scope="col">Room</th>
                                <th scope="col">HN</th>
                                <th scope="col">รายการอาหาร</th>
                                <th scope="col" style={{ textAlign: "center" }}>
                                    QTY
                                </th>
                                <th scope="col"  style={{ textAlign: "center" }}>
                                    Pirce
                                </th>
                                <th scope="col" style={{ textAlign: "center" }}>
                                    Amount
                                </th>
                                <th scope="col" style={{ textAlign: "center" }}>
                                    Comment
                                </th>
                            </tr>
                        </thead>

                        <tbody >
                            {DATA_TABLE}
                        </tbody>
                    </table>
                );

                return(
                    <div>
                 
                        <div className="Box-show-table">
                            {TABLE_DETAIL}
                        </div>
                        <div style={{display: 'none'}} >
                            <style>
                                {REPORT_STYLE}
                            </style>
                            <div ref={componentRef} >
                                <form id="form1" runat="server">
                                    <div id="container">
                                    <table style={{width: '100%'}}>
                                        <thead className="Thead">
                                            <tr>
                                                <td>
                                                    <div>
                                                    <br/>
                                                        <span style={{fontSize: '22px'}}>
                                                            {REPORT_TYPE == 'A' ? (
                                                                <b>
                                                                    สรุปรายการอาหารทั้งหมด
                                                                </b>
                                                            ): null}

                                                            {REPORT_TYPE == 'P' ? (
                                                                <b>
                                                                    สรุปรายการอาหารคนไข้
                                                                </b>
                                                            ):null}

                                                            {REPORT_TYPE == 'R' ? (
                                                                <b>
                                                                    สรุปรายการอาหารคนญาติ
                                                                </b>
                                                            ):null}
                                                        </span>
                                                        <span style={{float: 'right'}}>
                                                            <b>Kitchen</b> : 
                                                            <br/>
                                                            <b>นักโภชนาการ</b> : 
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        </thead>
                                    
                                        <tbody className="Tbody">
                                            <tr>
                                                <td>
                                                    <div id="pageNumbers">
                                                        {TABLE_DETAIL}
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>

                                        <tfoot className="Tfoot">
                                            <tr>
                                                <td>
                                                    <div>
                                                        เวลา : {PERIOD.PERIOD_START} - {PERIOD.PERIOD_END}  
                                                        <div className="NUM"></div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                                </form>
                            </div>
                        </div>
 
                    </div>
                );
            })()}
                
            </div>

        </div>
    );
}
