<?php

    include '../Config/Config.php';

    $TYPE = $_GET['Type'];
    $DATE_START = $_GET['DateStart'];
    $DATE_END = $_GET['DateEnd'];
    $PERIOD_START = $_GET['PeriodStart'];
    $PERIOD_END = $_GET['PeriodEnd'];

    $GET_TIME = "";
    if($PERIOD_START != '0000'){
        $GET_TIME = "AND J1.PirOdrTme BETWEEN '$PERIOD_START' AND '$PERIOD_END'";
    }       
    
    $GET_TYPE = "";
    if($TYPE != 'A'){
        $GET_TYPE = "AND J1.PirOdrUser = '$TYPE'";
    }  

    $FOOD_DETAIL = $con->query("    SELECT *, 
                                        DATE_FORMAT(J1.PirOdrDte,'%d-%m-%Y') As PirOdrDte, 
                                        TIME_FORMAT(J1.PirOdrTme, '%i:%S') As PirOdrTme
                                    FROM pirinf J1
                                    INNER JOIN fodmst J2
                                    ON J1.PirMnuCod = J2.FodBitCod
                                    WHERE   J1.PirPatSrv = 'F'
                                            AND J1.PirOdrStt = 'D'
                                            $GET_TYPE
                                            AND J1.PirOdrDte BETWEEN '$DATE_START' AND '$DATE_END'
                                            $GET_TIME
                                    ORDER BY PirSeq");  


    while ( $row = $FOOD_DETAIL->fetch_assoc())  {

        $dbdata[] = $row;

    }

    echo json_encode($dbdata);

?>