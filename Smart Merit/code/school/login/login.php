<?php
include '../../dbconnection/connect.php';
$conn = connect();
session_start();
$sql="select id from test where id='".$_SESSION['id']."' and pass='".$_SESSION['pass']."'";
if ($conn -> query($sql)) {
	
?>