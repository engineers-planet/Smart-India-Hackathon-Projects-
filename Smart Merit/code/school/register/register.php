<?php
include '../../dbconnection/connect.php';
include '../../aes.php';

echo "<a href='../login/index.php'>go to login page</a><br>";
session_start();

$conn = connect();
$sql = "select * from colleges where email='". $_SESSION['email']."';";
$res = $conn -> query($sql);
if ($res) {
	if ($res -> num_rows > 0) {
		echo "<br>email already exists<br>";
		disconnect($conn);
		die();
	}
}
else {
	die($conn -> error);
	disconnect($conn);
}
$sql = " select * from colleges where ph='".$_SESSION['ph']."';";
$res = $conn -> query($sql);
if ($res) {
	if ($res -> num_rows > 0) {
		echo "<br>phone number already exists<br>";
		disconnect($conn);
		die();
	}
}
else {
	die($conn -> error);
	disconnect($conn);
}
$_SESSION['pass'] = encrypt_decrypt('encrypt',$_SESSION['pass']);
$sql = "insert into colleges values(null,'". $_SESSION['name']."','".$_SESSION['pass']."','". $_SESSION['email']."','". $_SESSION['ph']."','".$_SESSION['addr']."','".$_SESSION['district']."');";
if ($conn -> query($sql))
    echo "<br>Your school is successfully registered<br>";
else {
	die($conn -> error);
	disconnect($conn);
}
echo $_SESSION['type'];
echo $_SESSION['district'];
?>