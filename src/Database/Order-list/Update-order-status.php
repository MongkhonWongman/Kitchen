<?php

    include "../Config/Config.php";

    $ID1 = $_GET['ID1'];
    $ID2 = $_GET['ID2'];
    $STT = $_GET['Stt'];


    $UpdateData = " UPDATE
                        `pirinf` J1
                    SET J1.PirOdrStt = '$STT', J1.PirScanCheck = '0'
                    WHERE J1.PirBillCod1 = '$ID1'
                        AND J1.PirBillCod2 = '$ID2'";
    $con -> query($UpdateData);

    echo("Update status success");
    
?>