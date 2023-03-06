<?php

    include '../Config/Config.php';

    $STT = $_GET['Stt'];

    $dbdata = array();

    if(isset($_GET['ID1'])){

        $ID1 = $_GET['ID1'];
        $ID2 = $_GET['ID2'];

        $FOOD_DETAIL = $con->query("    SELECT *, 
                                            DATE_FORMAT(J1.PirOdrDte,'%d-%m-%Y') As PirOdrDte, 
                                            TIME_FORMAT(J1.PirOdrTme, '%i:%S') As PirOdrTme
                                        FROM pirinf J1
                                        INNER JOIN fodmst J2
                                        ON J1.PirMnuCod = J2.FodBitCod
                                        WHERE J1.PirOdrDte = '$DATE'
                                            AND PirBillCod1 = '$ID1'
                                            AND PirBillCod2 = '$ID2'
                                            AND J1.PirOdrStt = '$STT'
                                        ORDER BY PirSeq");  


        while ( $row = $FOOD_DETAIL->fetch_assoc())  {

            $dbdata[] = $row;

        }

    }else{
        $KITCHEN = $_GET['Kitchen'];
        $FOOD_DETAIL = $con->query("    SELECT *, 
                                            DATE_FORMAT(J1.PirOdrDte,'%d-%m-%Y') As PirOdrDte, 
                                            TIME_FORMAT(J1.PirOdrTme, '%i:%S') As PirOdrTme
                                        FROM pirinf J1
                                        INNER JOIN fodmst J2
                                        ON J1.PirMnuCod = J2.FodBitCod
                                        WHERE J1.PirOdrDte = '$DATE'
                                            AND J1.PirOdrStt = '$STT'
                                            AND J2.FodKitCod = '$KITCHEN'");  


        while ( $row = $FOOD_DETAIL->fetch_assoc())  {

            $dbdata[] = $row;

        }

    }
   

    echo json_encode($dbdata);
?>