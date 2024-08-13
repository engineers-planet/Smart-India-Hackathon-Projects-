<?php
include '../../dbconnection/connect.php';
if($_SERVER['REQUEST_METHOD']=="POST") {
	$conn = connect();
	$sql = "select * from students where adhar='".$_POST['adhar']."';";
	$res = $conn -> query($sql) or die("Database Error");
	if($res -> num_rows != 1)
		$err = 1;
	else
		$err = 0;
}
?>
<!doctype html>
<html lang="en">
  <head>
	<!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!--Bootstrap CSS -->
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.min.css">
    <!--Font Awesome-->
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <!--Google Fonts-->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <!--Custom CSS -->
    <link rel="stylesheet" type="text/css" href="../css/register.css">
    <link rel="shortcut icon" type="image/x-icon" href="../img/icon.ico" />
    <title>Update</title>
  </head>
  <body>

    <!--navbar-->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="../"><img src="https://www.satadru.me/logo.png" height="30px" alt="DigIndia Logo"></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i class="fa fa-bars" aria-hidden="true"></i>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="../">HOME <span class="sr-only">(current)</span></a>
          </li>
           <li class="nav-item">
            <a class="nav-link" href="../admin">ADMIN PANEL</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="../about">ABOUT</a>
          </li>
        <li class="nav-item active">
            <a class="nav-link" href="index.php">UPDATE REQUEST</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="fa fa-university" aria-hidden="true"></i> SCHOOL
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="../login"><i class="fa fa-user" aria-hidden="true"></i>
 Login</a>
              <a class="dropdown-item" href="../register"><i class="fa fa-user-plus" aria-hidden="true"></i>
 Register</a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="../instruction">INSTRUCTION</a>
          </li>
            <li class="nav-item">
            <a class="nav-link" href="../contact">CONTACT</a>
          </li>
        </ul>
      </div>
    </nav>

    <!--hero img-->
    <section class="jumbotron">
        <div id="form" class="container-fluid gradient">
            <div class="container">
			<form id="needs-validation" action="" method = 'post' novalidate>
                <h1>Update Request for Students</h1>
                <hr>
			  <div class="row">
			    <div class="col-sm-12 mb-6">
			      <label for="schoolID">Aadhaar No</label>
			      <input type="text" class="form-control" id="adhar" name ="adhar" required>
			      <div class="invalid-feedback">
        			Please Enter Aadhaar No.
      			</div>
			    </div>
        </div>
          <div class="row">
              <div class="col-md-12 mb-6">
              <label>Year</label>
              <select class="custom-select d-block my-3" name="year" required>
                <option value="">Select</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
              </select>
              </div>
                </div>
                 <?php
                 if ($err==1 and $_SERVER['REQUEST_METHOD']=='POST')
                     echo "<p style='color:red';>adhar not registered</p>";
				 if ($err==0 and $_SERVER['REQUEST_METHOD']=='POST')
					 echo "<p style='color:blue';>request sent</p>";
                 ?>
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
    <script src="../js/jquery-3.3.1.slim.min.js"></script>
    <script src="../js/popper.min.js" ></script>
    <script src="../js/bootstrap.min.js"></script>
  </body>
</html>
