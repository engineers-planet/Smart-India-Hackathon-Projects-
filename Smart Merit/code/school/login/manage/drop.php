<?php
session_start();
include '../../../dbconnection/connect.php';
if ($_SERVER['REQUEST_METHOD'] == "POST") {
	$conn = connect();
	$_SESSION['year'] = $_POST['year'];
	$sql = "select adhar from dropout where scid='".$_SESSION['id']."' and year='".$_POST['year']."';";
	$res = $conn -> query($sql) or die($conn -> error);
  echo "<center>";
	echo "<div style='background-color:#007BFF;padding:50px;margin-top:120px;max-width:700px;border-radius:20px;'>";
	echo "<form method='post' action='drop_insert.php' style='font-size:20px;'>";
  echo "<h2 style='font-size:40px;color:white;'>Aadhaar &nbsp &nbsp Reason</h2>";
	for ($i=0;$i<$res -> num_rows;$i++) {
		$row = $res -> fetch_assoc();
		echo $row['adhar'];
		echo "<select name='".$row['adhar']."' style='font-size:20px;margin-left:70px;' required>";
    echo "<option value='Unknown'>Unknown</option>";
		echo "<option value='Finance'>Financial</option>";
    echo "<option value='Health Issues'>Health Issues</option>";
		echo "</select>";
		echo "<br><br>";
	}
  echo "<br>";
	echo "<button type='submit' style='background-color:white;padding:5px;font-size:20px;border-radius:20px;padding:8px;'>submit</button>";
	echo "</form>";
	echo "</div>";
  echo "</center>";
}
else {
	print_r(error_get_last());
  echo "<center>";
	echo "<div style='background-color:#007BFF;padding:50px;margin-top:120px;max-width:700px;border-radius:20px;'>";
  echo "<h1 style='margin-top:20px;color:white;'>Select Year To Check</h1>";
	echo "<form method='post' action='drop.php'>";
	echo "<select name='year' required style='font-size:20px;'>";
	echo "<option value='2016' style='font-size:20px;'>2016</option>";
	echo "<option value='2017' style='font-size:20px;'>2017</option>";
	echo "<option value='2018' style='font-size:20px;'>2018</option>";
	echo "</select>";
	echo " &nbsp <button style='background-color:white;padding:5px;font-size:20px;border-radius:20px;padding:8px;' type='submit'>submit</button>";
	echo "</form>";
	echo "</div>";
  echo "</center>";
}
?>
