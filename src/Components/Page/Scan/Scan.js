import React, {useState, useRef} from 'react';
import QrReader from 'react-qr-scanner';
import swal from 'sweetalert';
import $ from 'jquery';
import './Style.css';
import icon from '../../../img/Scan.png';
import {SCAN} from '../../API/API';

var data1 = "";
var data2 = "";

function App() { 

    const [scanResultWebCam, setScanResultWebCam] =  useState('');
    const [data, setData] = useState([]);

    const handleErrorWebCam = (error) => {
        console.log(error);
    }

    const handleScanWebCam = (result) => {
        if (result){
            setScanResultWebCam(result);
            fetch(SCAN.ORDER_DETAIL+"?SEQ="+result).then(res => res.json()).then(
                (result)=>{

                    setData(result);
                 
                }
            )
        }
    }

    const Con_order = (id) => {
        swal({
            icon: "success",
            title: 'ตรวจสอบแล้ว',
            text: 'ทำการยืนยันการตรวจสอบแล้ว.',
            timer: 1500,
            buttons: false
        }).then(
            function () {
                $.ajax({
                    url : SCAN.UPDATE_ORDER_SCAN+"?IdOrder="+id,
                    type : "POST",
                    success:function(data){

                        if(data === 'Success!'){
                            setScanResultWebCam("");
                        }
                    }            
                });
               
            }
        )
    }

    const renderTable = () => {

        if(data != '' ){

            if(data[0].PirSeq === 'old'){

                return(
                    <div>
                        <h3>
                            <b>
                                ไม่มีรายการ
                            </b>
                        </h3>
                    </div>
                );

            }else{

                return data.map(product => {
                    return (
                        <div key={product.FodBitCod} style={{width: '100%'}}>
                            
                            <h3><b>กรุณาตรวจสอบอาหาร</b></h3>
                            <h3><b>ให้ตรงกับผู้ป่วย</b></h3>
                        
                            <div style={{fontSize: '15px', width: '100%', paddingLeft: '50px', paddingRight: '50px' }}>
                                <hr/>
                                <div style={{textAlign: 'center'}}>
                                    {/* {(()=>{
                                        console.log(product);
                                    })()} */}
                                    <b>WARD {product.PirWrdCod}</b>
                                    <br/>
                                    <span>Room : {product.PirWrdCod}-{product.PirRoomCod}-{product.PirBedCod} HN : {product.PirHn}</span>
                                    <br/>
                                    <span style={{fontSize: '12px'}}>NAME : {product.PirUserName} AGE : {product.PirUserAge}</span>
                                    <br/>

                                    {(()=>{

                                        {(() => {
                                            var datastring1 = product.PirBillCod1;
                                            var datastring2 = product.PirBillCod2;
                                            var n1 = datastring1.length;
                                            var n2 = datastring2.length;

                                            if (n1 === 1) {
                                            data1 = "00" + product.PirBillCod1;
                                            }

                                            if (n1 === 2) {
                                            data1 = "0" + product.PirBillCod1;
                                            }

                                            if (n1 === 3) {
                                            data1 = product.PirBillCod1;
                                            }

                                            if (n2 === 1) {
                                            data2 = "00000" + product.PirBillCod2;
                                            }

                                            if (n2 === 2) {
                                            data2 = "0000" + product.PirBillCod2;
                                            }

                                            if (n2 === 3) {
                                            data2 = "000" + product.PirBillCod2;
                                            }

                                            if (n2 === 4) {
                                            data2 = "00" + product.PirBillCod2;
                                            }

                                            if (n2 === 5) {
                                            data2 = "0" + product.PirBillCod2;
                                            }

                                            if (n2 === 6) {
                                            data2 = product.PirBillCod2;
                                            }

                                        })()}

                                    })()}
                                    <span style={{fontSize: '12px'}}>ON. {data1}-{data2}</span>
                                </div>
                                <hr/>
                                <div style={{textAlign: 'left'}}>
                                    <b>{product.FodMnuNamThai}</b>
                                    <br/>
                                    <u><b>Comment</b></u> {product.PirOdrCmt}
                                    <br/>
                                    <br/>
                                    <span>เวลาสั่งอาหาร : {product.PirOdrDte} | {product.PirOdrTme}</span>
                                    <br/>
                                </div>
                                <br/>
                                <br/>
                                <button type="button" className="btn btn-outline-primary" style={{border: '4px solid'}} onClick={Con_order.bind(this, product.PirSeq)}>ตรวจแล้ว</button>
                            </div>
                
                        </div>
                    )
                });

            }            

        }else{

            return(
                <div>
                    <h3>
                        <b>
                            รายการอาหาร
                            <br/>
                            ถูกตรวจสอบไปแล้ว
                        </b>
                    </h3>
                </div>
            );

        }


    }


    return (
        <div className="Scan-body">

            <div className="qr-image-wrapper">
                <div className="modal-root">
                    <img src={icon} style={{width :'100%', height: '100%'}} className="box" />
                </div>
                <QrReader onError={handleErrorWebCam} onScan={handleScanWebCam.bind(this)} />
            </div>

            {(()=>{
                if(scanResultWebCam != ''){
                    return(
                        <div className="Text-not-scan">
                            {/* <h3>{scanResultWebCam}</h3> */}
                            {renderTable()}
                        </div>
                    )
                }else{
                    return(
                        <div className="Text-not-scan">
                            สแกน QR
                                <br/>
                            เพื่อตรวจเช็คอาหาร
                        </div>
                    )
                }
            })()}
        </div>
    );
}
export default App;
