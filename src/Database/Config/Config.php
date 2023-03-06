<?php

    header("Access-Control-Allow-Origin: *");
    date_default_timezone_set('Asia/Bangkok');

    $DATE = date("Ymd");
    $TIME = date("Hi");

    // HOSPITAL
    $RAM = 'RAM';
    $CMR = 'CMR';
    $DEV = 'DEV';

    $TABLE = '';
    $TOMCAT_SERVICE = '';

    $HOSPITAL_NAME = $DEV; // แก้ไขเมื่อเปลี่ยน รพ. <<< 

    if($HOSPITAL_NAME === 'DEV'){

        $TABLE = 'b_med_iden';
        $TOMCAT_SERVICE = 'http://10.88.3.14:8080/InRoom/DBService?dbServiceName=';

    }


    if($HOSPITAL_NAME === 'RAM'){

        $TABLE = 'b_med_iden';
        $TOMCAT_SERVICE = 'http://rkh-brbapp01.rhg.com:8080/InRoom/DBService?dbServiceName=';

    }

    if($HOSPITAL_NAME === 'CAM'){

        $TABLE = 'ir_cmr';
        $TOMCAT_SERVICE = '';
        
    }


    // CONNECT DATABASE
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $db = $TABLE;

    // Create connection
    $con = new mysqli($servername, $username, $password, $db);

    // Check connection
    if ($con->connect_error) {
        die("Connection failed: " . $con -> connect_error);
    }
    // echo "Connected successfully";

    $SET_FOOD_NAME = "REPLACE( REPLACE( FodMnuNamThai, '[IS]', ''), '[FH]', '') AS FoodNameDisplay_TH, REPLACE( REPLACE( FodMnuNamEing, '[IS]', ''), '[FH]', '') AS FoodNameDisplay_ENG";

?>