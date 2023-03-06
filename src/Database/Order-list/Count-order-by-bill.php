<?php

    include "../Config/Config.php";
    
    $STT = $_GET['Stt'];
    $KITCHEN = $_GET['Kitchen'];

    $dbdata = array();

    $All_order = $con -> query("SELECT
                                    COUNT(DISTINCT PirBillCod1, PirBillCod2) QTY1
                                FROM
                                    pirinf
                                    INNER JOIN `fodmst` ON `fodmst`.`FodBitCod` = `pirinf`.`PirMnuCod`
                                WHERE
                                    PirPatSrv = 'F'
                                    AND PirOdrStt = '$STT'
                                    AND FodKitCod = '$KITCHEN'
                                    AND PirOdrDte = '$DATE';");

    while ( $row = $All_order -> fetch_assoc())  {
        $dbdata[]=$row;
    }

    echo json_encode($dbdata);

?>
