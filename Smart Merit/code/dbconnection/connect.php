<?php
function connect() {
	$host = "localhost";
	$user = "root";
	$pass = "DigIndiaRocks";
	$db = "schooldb";
	
	$conn=new mysqli($host,$user,$pass,$db) or die(" Error");
	return $conn;
}
function disconnect($conn) {
	$conn -> close();
}
?>