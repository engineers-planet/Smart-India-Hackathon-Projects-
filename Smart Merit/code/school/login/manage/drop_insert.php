<?php
include '../../../dbconnection/connect.php';
session_start();
if ($_SERVER['REQUEST_METHOD'] == "POST") {
	$conn = connect();
	$sql = "select adhar from dropout where scid='".$_SESSION['id']."' and year='".$_SESSION['year']."';";
	$res = $conn -> query($sql) or die($conn -> error);
	for ($i=0;$i<$res -> num_rows;$i++) {
		$row = $res -> fetch_assoc();
		$sql = "update dropout set reason='".$_POST[$row['adhar']]."' where adhar='".$row['adhar']."';";
		$conn -> query($sql) or die($conn -> error);
	}
	header('Location: index.php');
}
else {
	echo "What are u trying to do??";
}
?>