<?php
include '../../../dbconnection/connect.php';
session_start();
//if($_SERVER['REQUEST_METHOD'] == "POST") {
	$conn = connect();
	$sql = "select reason from dropout";
	$pre = $conn -> query($sql) or die($conn -> error);
	$sql = "truncate table dropout";
	$conn -> query($sql) or die($conn -> error);
	$sql = "select distinct year from marks order by year";
	$res = $conn -> query($sql) or die($conn -> error);
	$year = $res -> fetch_assoc();
	for($i=0;$i<$res->num_rows-1;$i++) {
		$pyear = $year['year'];
		$row = $res -> fetch_assoc();
		$year = $row['year'];
		$sql="select adhar from marks where year='".$pyear."' and adhar not in (select adhar from marks where year='".$year."');";
		$tres = $conn -> query($sql) or die($conn -> error);
		for ($i=0;$i<$tres->num_rows;$i++) {
			$row = $tres -> fetch_assoc();
			$sql = "select scid from students where adhar='".$row['adhar']."';";
			$ntres = $conn -> query($sql) or die($conn -> error);
			$ntres = $ntres -> fetch_assoc();
			$sql = "insert into dropout values('".$ntres['scid']."','".$row['adhar']."','".$year."',null);";
			$conn -> query($sql) or die($conn -> error);
		}
	}
	for ($i=0;$i<$pre -> num_rows;$i++) {
		$c = $i + 2;
		$sql = "select adhar from dropout limit ".$c.",1;";
		$res = $conn -> query($sql) or die($conn -> error);
		$row = $res -> fetch_assoc();
		$adhar = $row['adhar'];
		$row = $pre -> fetch_assoc();
		$sql = "update dropout set reason='".$row['reason']."' where adhar='".$adhar."';";
		$conn -> query($sql) or die($conn -> error);
	}
//}
?>
	