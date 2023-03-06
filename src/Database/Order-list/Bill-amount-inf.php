<?php

    include "../Config/Config.php";

    $ID1 = $_GET['ID1'];
    $ID2 = $_GET['ID2'];
    $STT = $_GET['Stt'];
    
    $dbdata = array();

        $query = $con -> query("SELECT
                                    SUM(J2.FodPrcNum * J1.PirOdrQty) SumPrice,
                                    SUM(J1.PirOdrQty) SumQty
                                FROM
                                    pirinf J1
                                INNER JOIN fodmst J2 ON J1.PirMnuCod = J2.FodBitCod
                                WHERE J1.PirPatSrv = 'F'
                                    AND J1.PirBillCod1 = '$ID1'
                                    AND J1.PirBillCod2 = '$ID2'
                                    AND J1.PirOdrStt = '$STT'
                                    AND J1.PirOdrDte = '$DATE';"); 

    while ( $row = $query -> fetch_assoc())  {
        $dbdata[]=$row;
    }

    echo json_encode($dbdata);

?>
