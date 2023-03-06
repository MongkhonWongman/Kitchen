<?php
    include "../Config/Config.php";

    $User = $_POST['User'];
    $Pass = $_POST['Pass'];

    // ORDER
    $FileContents = file_get_contents($TOMCAT_SERVICE."IRKitchen_Login&user=".$User."&pass=".$Pass);

    // echo $FileContents;

    echo($User);

?>