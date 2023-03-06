<?php

    include '../Config/Config.php';

    $STT = $_GET['Stt'];

    $dbdata = array();

    if(isset($_GET['ID1'])){

        $ID1 = $_GET['ID1'];
        $ID2 = $_GET['ID2'];

        $order = $con -> query("SELECT
                                    DISTINCT J1.PirBillCod1,
                                    J1.PirBillCod2,
                                    J1.PirWrdCod,
                                    J1.PirRoomCod,
                                    J1.PirBedCod,
                                    J1.PirUserName,
                                    J1.PirHn,
                                    J1.PirUserAge,
                                    J1.PirOdrStt,
                                    J1.PirScanCheck,
                                    TIME_FORMAT(J1.PirOdrTme, '%i:%S') As PirOdrTme
                                FROM
                                    pirinf J1
                                INNER JOIN fodmst J2 ON J1.PirMnuCod = J2.FodBitCod
                                WHERE J1.PirPatSrv = 'F'
                                    AND J1.PirBillCod1 = '$ID1'
                                    AND J1.PirBillCod2 = '$ID2'
                                    AND J1.PirOdrStt = '$STT'
                                    AND J1.PirOdrDte = '$DATE';");    
 
        while ( $row = $order -> fetch_assoc())  {
 
            $dbdata[] = $row;
        
        }

    }else{

        $KITCHEN = $_GET['Kitchen'];
        $order = $con -> query("SELECT
                                    DISTINCT J1.PirBillCod1,
                                    J1.PirBillCod2,
                                    J1.PirWrdCod,
                                    J1.PirRoomCod,
                                    J1.PirBedCod,
                                    J1.PirUserName,
                                    J1.PirHn,
                                    J1.PirUserAge,
                                    J1.PirOdrStt,
                                    J1.PirScanCheck,
                                    J2.FodKitCod,
                                    TIME_FORMAT(J1.PirOdrTme, '%i:%S') As PirOdrTme
                                FROM
                                    pirinf J1
                                INNER JOIN fodmst J2 ON J1.PirMnuCod = J2.FodBitCod
                                WHERE J1.PirPatSrv = 'F'
                                    AND J2.FodKitCod = '$KITCHEN'
                                    AND J1.PirOdrStt = '$STT'
                                    AND J1.PirOdrDte = '$DATE'
                                ORDER BY PirBillCod2 ASC;");    
                                
        
        while ( $row = $order -> fetch_assoc())  {

            if($row['PirOdrStt'] === 'R'){
                // สั่งอาหารสำเร็จ
                $row['PirOdrStt'] = 'สั่งอาหารสำเร็จ';
            }

            
            if($row['PirOdrStt'] === 'C'){
                // ห้องอาหารรับ Order
                $row['PirOdrStt'] = 'ห้องอาหารรับ Order';
            }


            if($row['PirOdrStt'] === 'P'){
                // กำลังปรุง
                $row['PirOdrStt'] = 'กำลังปรุง';
            }


            if($row['PirOdrStt'] === 'F'){
                // ปรุงเสร็จ
                $row['PirOdrStt'] = 'ปรุงเสร็จ';
            }


            if($row['PirOdrStt'] === 'D'){
                // กำลังจัดส่ง
                $row['PirOdrStt'] = 'กำลังจัดส่ง';
            }
                
            $dbdata[] = $row;
        
        }

    }

    echo json_encode($dbdata);

?>