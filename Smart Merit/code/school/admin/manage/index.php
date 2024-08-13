<?php
include '../../../dbconnection/connect.php';
session_start();
if (!isset($_SESSION['id'])) {
	$_SESSION['err'] = "log in first";
	header('Location: ../index.php');
}
if ($_SERVER['REQUEST_METHOD']=='POST') {
	$year = $_POST['year'];
	$class = $_POST['class'];
	$conn = connect();
	$sql = "select id from colleges";
	$res = $conn -> query($sql) or die($conn -> error);
	$f = fopen('sc','w') or die("Error openning file");
	for($i=0;$i<$res -> num_rows;$i++) {
		$row = $res -> fetch_assoc();
		fwrite($f,$row['id']);
		fwrite($f,"\n");
	}
	fclose($f);
	$sql = "select scid,adhar,academics,sports,arts,club from marks natural join students where year='".$year."' and class='".$class."';";
	$res = $conn -> query($sql) or die($conn -> error);
	$f = fopen('data','w') or die(error_get_last());
	for($i=0;$i<$res -> num_rows;$i++) {
		$row = $res -> fetch_assoc();
		fwrite($f,$row['scid']);
		fwrite($f," ");
		fwrite($f,$row['adhar']);
		fwrite($f," ");
		fwrite($f,$row['academics']);
		fwrite($f," ");
		fwrite($f,$row['sports']);
		fwrite($f," ");
		fwrite($f,$row['arts']);
		fwrite($f," ");
		fwrite($f,$row['club']);
		fwrite($f,"\n");
	}
	fclose($f);
	$s = 'python3 z.py '.$_POST['ch'];
	system($s,$st);
	$f = fopen('sc','r') or die("Error openning file");
	$out = fopen('final.csv','w') or die("Error openning file");
	fwrite($out,"sc id,sc name,adhar,student\n");
	while(!feof($f)) {
		$l = fgets($f);
		$data = explode(",",$l);
		$sql = "select name from colleges where id='".$data[0]."';";
		$res = $conn -> query($sql) or die("Database Error");
		$row = $res -> fetch_assoc();
		$name = $row['name'];
		$sql = "select name from students where adhar='".$data[1]."';";
		$res = $conn -> query($sql) or die("Database Error");
		$row = $res -> fetch_assoc();
		$sname = $row['name'];
		$s = $data[0].",".$name.",".$data[1].",".$sname;
		fwrite($out,$s);
		fwrite($out,"\n");
	}
	fclose($f);
	fclose($out);
	$_SESSION['ch'] = $_POST['ch'];
	header('Location: view.php');
}
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
              <a class="nav-link" href="dropout.php">Dropout</a>
          </li>
            <li class="nav-item">
            <a class="nav-link" href="../logout.php">Logout</a>
          </li>
        </ul>
      </div>
    </nav>

    <!--manage dashboard-->
    <section class="jumbotron" style="background-color:black;">
              <h5 class="list-group-item active main-color-bg">Dashboard</h5>
              <div class="main">
					<br>
					 <div id="form" class="container-fluid gradient">
            <div class="container">
			<form id="needs-validation" method="post" action="" novalidate>
			   <div class="row">
			    <div class="col-md-6 mb-3">
			    <label>Class</label>
			    <select class="custom-select d-block my-3" name="class" required>
				    <option value="">Select</option>
				    <option value="2">2</option>
				    <option value="3">3</option>
                    <option value="4">4</option>
  				</select>
  				</div>
  				<div class="col-md-6 mb-3">
			    <label>Year</label>
			    <select class="custom-select d-block my-3" name="year" required>
				    <option value="">Select</option>
				    <option value="2016">2016</option>
				    <option value="2017">2017</option>
                    <option value="2018">2018</option>
  				</select>
  				</div>
				<!--
  				<div>
				 <div class="col-md-12 mb-6">
			    <label>General Marks</label>
			    <select class="custom-select d-block my-3" name="marks" required>
				    <option value="">Select</option>
					<option value="0">NA</option>
				    <option value="50">Greater than 50</option>
				    <option value="60">Greater than 60</option>
					<option value="70">Greater than 70</option>
					<option value="80">Greater than 80</option>
					<option value="90">Greater than 90</option>
  				</select>
  				</div>
				</div>
				<br>
				<div class="row">
			    <div class="col-md-4">
			    <label>Sports</label>
			    <select class="custom-select d-block my-3" name="sports" required>
				    <option value="">Select</option>
					<option value="0">NA</option>
					<option value="1">1</option>
				    <option value="2">2</option>
				    <option value="3">3</option>
                    <option value="4">4</option>
					<option value="5">5</option>
					<option value="6">6</option>
					<option value="7">7</option>
					<option value="8">8</option>
					<option value="9">9</option>
					<option value="10">10</option>
  				</select>
  				</div>
  				<div class="col-md-4">
			    <label>Arts</label>
			    <select class="custom-select d-block my-3" name="arts" required>
				    <option value="">Select</option>
					<option value="0">NA</option>
					<option value="1">1</option>
				    <option value="2">2</option>
				    <option value="3">3</option>
                    <option value="4">4</option>
					<option value="5">5</option>
					<option value="6">6</option>
					<option value="7">7</option>
					<option value="8">8</option>
					<option value="9">9</option>
					<option value="10">10</option>
  				</select>
  				</div>
				<div class="col-md-4">
			    <label>Club</label>
			    <select class="custom-select d-block my-3" name="club" required>
				    <option value="">Select</option>
					<option value="0">NA</option>
					<option value="1">1</option>
				    <option value="2">2</option>
				    <option value="3">3</option>
                    <option value="4">4</option>
					<option value="5">5</option>
					<option value="6">6</option>
					<option value="7">7</option>
					<option value="8">8</option>
					<option value="9">9</option>
					<option value="10">10</option>
  				</select>
  				</div>
				-->
				<div>
				 <div class="col-md-12 mb-6">
			    <label>Select a Category:</label>
			    <select class="custom-select d-block my-3" name="ch" required>
				    <option value="">Select</option>
				    <option value="1">Academics</option>
				    <option value="2">Sports</option>
					<option value="3">Arts</option>
					<option value="4">Club</option>
  				</select>
  				<div>
			    <br>
			  <button class="btn btn-primary" type="submit">Submit</button>
			</form>
            <br>
            </div>
			<script>
			//JavaScript for disabling form submissions if there are invalid fields
			(function() {
			  "use strict";
			  window.addEventListener("load", function() {
			    var form = document.getElementById("needs-validation");
			    form.addEventListener("submit", function(event) {
			      if (form.checkValidity() == false) {
			        event.preventDefault();
			        event.stopPropagation();
			      }
			      form.classList.add("was-validated");
			    }, false);
			  }, false);
			}());
			</script>
    </div>
    </section>

                </div>
    </section>

    <!--footer-->
<!--
    <footer>
        <div class="container">
        <div class="row">
          <div class="col-sm-3">
            <p>Home</p>
            <p>MyGov</p>
            </div>
          <div class="col-sm-3">
              <p>About</p>
              <p>Terms & Conditions</p>
            </div>
            <div class="col-sm-3">
              <p>Contact</p>
                <p>FAQ</p>
            </div>
            <div class="col-sm-3">
              <h2>DigIndia</h2>
            </div>
        </div>
        </div>
        <div id="copyright">
            <p>&copy; Content Owned, Designed, Updated & Maintained by DigIndia on behalf of Government of India</p>
        </div>
    </footer>
-->

	<!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="../../js/jquery-3.3.1.slim.min.js"></script>
    <script src="../../js/popper.min.js" ></script>
    <script src="../../js/bootstrap.min.js"></script>
  </body>
</html>
ml>
tml>
ml>
tml>
ml>
tml>
ml>
tml>
ml>
tml>
ml>
