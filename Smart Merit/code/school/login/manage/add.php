<?php
include '../../../dbconnection/connect.php';
session_start();
if (!isset($_SESSION['id'])) {
	$_SESSION['err'] = "log in first";
	header('Location: ../index.php');
}
if ($_SERVER['REQUEST_METHOD']=='POST') {
	$conn = connect();
	$sql = "insert into students values('".$_SESSION['id']."','".$_POST['name']."','".$_POST['sex']."','".$_POST['adhar']."','".$_POST['fname']."','".$_POST['ph']."');";
	echo $sql;
	if ($conn -> query($sql)) {

	}
	else {
		die($conn -> error);
	}
	$sql = "insert into marks values('".$_POST['adhar']."','".$_POST['year']."','".$_POST['class']."','".$_POST['academics']."','".$_POST['sports']."','".$_POST['arts']."','".$_POST['club']."');";
	if ($conn -> query($sql)) {
	}
	else {
		die($conn -> error);
	}
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
    <link rel="stylesheet" type="text/css" href="../../css/schoolAdminAdd.css">
    <title></title>
  </head>
  <body>

    <!--navbar-->
    <nav class="navbar navbar-expand-lg navbar-default fixed-top">
      <a class="navbar-brand" href="index.php"><i class="fa fa-cog" aria-hidden="true"></i>
 School Admin</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i class="fa fa-bars" aria-hidden="true"></i>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
              <a class="nav-link" href="index.php">Dashboard</a>
          </li>
          <li class="nav-item active">
              <a class="nav-link" href="add.php">Add Student</a>
          </li>
					<li class="nav-item">
              <a class="nav-link" href="drop.php">Dropout</a>
          </li>
            <li class="nav-item">
            <a class="nav-link" href="../logout.php">Logout</a>
          </li>
        </ul>
      </div>
    </nav>

    <!--manage dashboard-->
    <section class="jumbotron" style="background-color:black;">
              <h5 class="list-group-item active main-color-bg">Add Student</h5>
              <div class="main">
                    <div id="form" class="container-fluid gradient">
            <div class="container">
			<form id="needs-validation" method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post" novalidate>
				<br>
			  <div class="row">
			    <div class="col-sm-12 mb-6">
			      <label for="studentName">Student Name</label>
			      <input type="text" class="form-control" id="studentName" name="name" required>
			      <div class="invalid-feedback">
        			Please provide Student Name
      			</div>
			    </div>
				</div>
				<div class="row">
			    <div class="col">
			      <label for="studentAadhaar">Student Aadhaar No</label>
                    <small id="aadhaarHelp" class="form-text text-muted">This will be used to verify identity</small>
			      <input type="text" class="form-control" id="studentAadhaar" name="adhar" required>
			      <div class="invalid-feedback">
        			Please enter 12 digit Aadhaar No
      			</div>
			    </div>
				</div>
				<br>
				<div class="row">
					<div class="col">
					    <label for="adharDOC">Upload Aadhaar (Under 1MB and in .JPG) &nbsp</label>
					    <input type="file" class="form -control form-control-file" id="adharDOC" required>
							<div class="invalid-feedback">
	        			Please Upload Aadhaar
	      			</div>
					</div>
				</div>
				<div class="row">
				<div class="col-md-12 mb-6">
				 <label>Gender</label>
				 <select class="custom-select d-block my-3" name="sex" required>
				   <option value="">Select</option>
				   <option value="Male">Male</option>
				   <option value="Female">Female</option>
				   <option value="Others">Others</option>
				 </select>
				 </div>
				<div class="col-sm-12 mb-6">
			      <label for="fName">Guardian's Name</label>
			      <input type="text" class="form-control" id="fName" name="fname" required>
			      <div class="invalid-feedback">
        			Please provide Guardian's Name
      			</div>
			    </div>
        </div>
			  <div class="row">
			    <div class="col-sm-12 mb-3">
			      <label for="studentMob">Mobile no</label>
                    <small id="idHelp" class="form-text text-muted">Parent's Contact No</small>
			      <input type="text" class="form-control" id="studentMob" placeholder="10 digit mobile no" name="ph" required>
			      <div class="invalid-feedback">
        			Please provide a valid Mobile No.
      			</div>
			    </div>
			   </div>
			   <div class="row">
			    <div class="col-md-12 mb-6">
			    <label>Current Class</label>
			    <select name="class" class="custom-select d-block my-3" required>
				    <option value="">Select</option>
				    <option value="2">2</option>
				    <option value="3">3</option>
					<option value="4">4</option>
  				</select>
  				</div>
          </div>
		  <div class="row">
			    <div class="col-md-12 mb-6">
			    <label>Current Year</label>
			    <select name="year" class="custom-select d-block my-3" required>
				    <option value="">Select</option>
				    <option value="2016">2016</option>
				    <option value="2017">2017</option>
					<option value="2018">2018</option>
  				</select>
  				</div>
          </div>
          <br>
          <center><h5>Previous Year Academic Details</h5></center>
		  <hr>
          <div class="row">
            <div clas="col-md-12 mb-6">
                <label for="studentMarks">General Marks</label>
                    <small id="stdHelp" class="form-text text-muted">Out of 100</small>
    			    <input type="text" name="academics" class="form-control" id="studentMarks" required>
    			    <div class="invalid-feedback">
            			Please enter marks
          			</div>
            </div>
          </div>
					<br>
					<div class="row">
					<div class="col">
					    <label for="markDOC">Upload Marksheet (Under 1MB and in .JPG) &nbsp</label>
					    <input type="file" class="form -control form-control-file" id="markDOC" required>
							<div class="invalid-feedback">
	        			Please Upload Aadhaar
	      			</div>
					</div>
				</div>
		  <br>
          <center>
			  <h5>Previous Year Extra Curriculm Details</h5>
			  <p>(Select NA if Not Applicable)</p>
		  </center>
		  <hr>
            <div class="row">
			    <div class="col-md-12 mb-6">
			    <label>Sports</label>
			    <select name="sports" class="custom-select d-block my-3" required>
				    <option value="">select</option>
					<option value="NA">NA</option>
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
          </div>
		  <div class="row">
			    <div class="col-md-12 mb-6">
			    <label>Arts</label>
			    <select name="arts" class="custom-select d-block my-3" required>
				    <option value="">select</option>
					<option value="NA">NA</option>
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
          </div>
		  <div class="row">
			    <div class="col-md-12 mb-6">
			    <label>Club</label>
			    <select name="club" class="custom-select d-block my-3" required>
				    <option value="">select</option>
					<option value="NA">NA</option>
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
          </div>
			  <br>
			  <center><button class="btn btn-primary" type="submit">Submit</button></center>
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
