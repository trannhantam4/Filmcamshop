<?php
 
    $CN =  mysqli_connect("localhost","root","");
    $DB =  mysqli_select_db($CN,"cst");

    $userID = $_POST['userID'];
    $userName = $_POST['userName'];
    $userEmail = $_POST['userEmail'];
    $userPhone = $_Post['userPhone'];
    $password = $_Post['password'];

    $IQ = "insert into filmcamshop(userID,userName,userEmail,userPhone,password) values ($userID,'$userName',' $userEmail',$userPhone,'$password')";

    $R = mysqli_query($CN,$IQ);

    if($R){
        $Message="User has been registered successfully";
    }
    else{
        $Message="Server error... Please try later";
    }
    echo($Message);
 
?>