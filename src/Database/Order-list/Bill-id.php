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
                // ?????????????????????????????????????????????
                $row['PirOdrStt'] = '?????????????????????????????????????????????';
            }

            
            if($row['PirOdrStt'] === 'C'){
                // ???????????????????????????????????? Order
                $row['PirOdrStt'] = '???????????????????????????????????? Order';
            }


            if($row['PirOdrStt'] === 'P'){
                // ???????????????????????????
                $row['PirOdrStt'] = '???????????????????????????';
            }


            if($row['PirOdrStt'] === 'F'){
                // ???????????????????????????
                $row['PirOdrStt'] = '???????????????????????????';
            }


            if($row['PirOdrStt'] === 'D'){
                // ?????????????????????????????????
                $row['PirOdrStt'] = '?????????????????????????????????';
            }
                
            $dbdata[] = $row;
        
        }

    }

    echo json_encode($dbdata);

?>