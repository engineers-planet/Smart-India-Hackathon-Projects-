<?php
include '../../../dbconnection/connect.php';
session_start();
//if ($_SERVER['REQUEST_METHOD'] == "POST") {
	$year = $_POST['year'];
	$pyear = $year - 1;
	$conn = connect();
	$f = fopen('final.csv','w');
	$sql = "select scid,adhar from dropout where reason='Health Issues';";
	$res = $conn -> query($sql) or die($conn -> error);
	fwrite($f,"adhar,name,gender,scid\n");
	for($i=0;$i<$res -> num_rows;$i++) {
		$row = $res -> fetch_assoc();
		$sql = "select name,gender from students where adhar='".$row['adhar']."';";
		$tres = $conn -> query($sql);
		$tres = $tres -> fetch_assoc();
		fwrite($f,$row['adhar']);
		fwrite($f,",");
		fwrite($f,$tres['name']);
		fwrite($f,",");
		fwrite($f,$tres['gender']);
		fwrite($f,",");
		fwrite($f,$row['scid']);
		fwrite($f,"\n");
	}
	fclose($f);
//}
?>
<!doctype html>
<html lang="en">
  <head>
	<!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!--Bootstrap CSS -->
    <link rel="stylesheet" type="text/css" href="../../css/bootstrap.min.css">
    <!--Font Awesome-->
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <!--Google Fonts-->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <!--Custom CSS -->
    <link rel="stylesheet" type="text/css" href="../../css/schoolAdmin.css">
    <title></title>
    <style>
            table {
                border-collapse: collapse;
                border: 2px black solid;
                font: 24px sans-serif;
                margin:40px auto;
            }

            td {
                border: 1px black solid;
                padding: 5px;
            }
        </style>
  </head>
  <body>
  <!--navbar-->
		<nav class="navbar navbar-expand-lg navbar-default fixed-top">
		  <a class="navbar-brand" href="index.php"><i class="fa fa-cog" aria-hidden="true"></i>
	 Admin</a>
		  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		    <i class="fa fa-bars" aria-hidden="true"></i>
		  </button>

		  <div class="collapse navbar-collapse" id="navbarSupportedContent">
		    <ul class="navbar-nav ml-auto">
		      <li class="nav-item active">
		          <a class="nav-link" href="index.php">Manage</a>
		      </li>
		        <li class="nav-item">
		        <a class="nav-link" href="../logout.php">Logout</a>
		      </li>
		    </ul>
		  </div>
		</nav>

    <!--manage dashboard-->
		<h1 style="text-align:center;margin-top:100px;">DROPOUT FOR HEALTH ISSUES</h1><br>
		<script src="table.js"></script>
        <script type="text/javascript" charset="utf-8">
            d3.text("final.csv", function(data) {
                var parsedCSV = d3.csv.parseRows(data);

                var container = d3.select("body")
                    .append("table")

                    .selectAll("tr")
                        .data(parsedCSV).enter()
                        .append("tr")

                    .selectAll("td")
                        .data(function(d) { return d; }).enter()
                        .append("td")
                        .text(function(d) { return d; });
            });
        </script>
	</body>
</html>
