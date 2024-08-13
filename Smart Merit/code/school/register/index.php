<?php
    session_start();
	$isValid = true;
	$pas="";
	$passErr = "";
	$name="";
	$ph="";
	$phErr="";
	if ($_SERVER['REQUEST_METHOD']=="POST") {
		if ($_POST["scpass"] != $_POST['screpass']) {
			$passErr = "*passwords must be same";
			$isValid = false;
		}
		elseif (strlen($_POST['scpass']) < 8) {
			$passErr = nl2br("*password must have atleast 8 characters, atleast one digit\r\nand atleast one special character");
			$isValid = false;
		}
		if (strlen($_POST['scph']) != 10) {
			$phErr = "*Invalid phone number";
			$isValid = false;
		}
	    if ($isValid) {
			$_SESSION['name'] = $_POST['scname'];
			$_SESSION['pass'] = $_POST['scpass'];
			$_SESSION['addr'] = $_POST['scaddr'];
			$_SESSION['email'] = $_POST['scemail'];
			$_SESSION['ph'] = $_POST['scph'];
			$_SESSION['type'] = $_POST['type'];
			$_SESSION['district'] = $_POST['district'];
			header("Location: register.php");
	      die();
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
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.min.css">
    <!--Font Awesome-->
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <!--Google Fonts-->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <!--Custom CSS -->
    <link rel="stylesheet" type="text/css" href="../css/register.css">
	<link rel="shortcut icon" type="image/x-icon" href="../img/icon.ico" />
    <title>School Registration</title>
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
          <li class="nav-item active">
            <a class="nav-link" href="../">HOME <span class="sr-only">(current)</span></a>
          </li>
           <li class="nav-item">
            <a class="nav-link" href="../admin/">ADMIN PANEL</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="../about/">ABOUT</a>
          </li>
        <li class="nav-item">
            <a class="nav-link" href="../update/">UPDATE REQUEST</a>
          </li>
          <li class="nav-item dropdown active">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="fa fa-university" aria-hidden="true"></i> SCHOOL
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="../login/"><i class="fa fa-user" aria-hidden="true"></i>
 Login</a>
              <a class="dropdown-item" href="index.php"><i class="fa fa-user-plus" aria-hidden="true"></i>
 Register</a>
            </div>
          </li>
            <li class="nav-item">
            <a class="nav-link" href="../instruction/">INSTRUCTION</a>
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
			<form id="needs-validation" method="post" novalidate>
                <h1>Register Your School</h1>
                <hr>
			  <div class="row">
			    <div class="col-sm-12 mb-6">
			      <label for="schoolName">School Name</label>
			      <input type="text" class="form-control" id="schoolName" name="scname" required>
			      <div class="invalid-feedback">
        			Please provide a School Name.
      			</div>
			    </div>
                  <div class="col-sm-12 mb-6">
			      <label for="schoolPass">Password</label>
                    <small id="idHelp" class="form-text text-muted">This will be School's Login Password</small>
			      <input type="password" class="form-control" name="scpass" id="schoolPass" required>
			      <div class="invalid-feedback">
        			Please Choose a Password.
      			</div>
			    </div>
                <div class="col-sm-12 mb-6">
			      <label for="schoolPass">Confirm Password</label>
                    <small id="idHelp" class="form-text text-muted">Must be same as Password</small>
			      <input type="password" class="form-control" id="schoolPass" name="screpass" required>
				  <span style='color:red;'><?php echo $passErr; ?></span><br>
			      <div class="invalid-feedback">
        			Please Confirm Password.
      			</div>
			    </div>
			  </div>
			  <div class="row">
			    <div class="col-sm-12 mb-3">
			      <label for="schoolMob">Mobile no</label>
                    <small id="idHelp" class="form-text text-muted">Principle's/Head's Contact No</small>
			      <input type="text" class="form-control" id="schoolMob" name="scph" placeholder="10 digit mobile no" required>
				  <span style="color:red"><?php echo $phErr; ?></span><br>
			      <div class="invalid-feedback">
        			Please provide a valid Mobile No.
      			</div>
			    </div>
			   </div>
                <div class="row">
			    <div class="col-sm-12 mb-3">
			      <label for="schoolEmail">Email ID</label>
                    <small id="idHelp" class="form-text text-muted">Principle's/Head's Email ID</small>
			      <input type="email" class="form-control" id="schoolEmail" name="scemail" required>
			      <div class="invalid-feedback">
        			Please provide a valid Email.
      			</div>
			    </div>
			   </div>
			   <div class="row">
			    <div class="col-md-12 mb-6">
			    <label>School Type</label>
			    <select class="custom-select d-block my-3" name="type" required>
				    <option value="">Select</option>
				    <option value="Government">Government</option>
				    <option value="Government Aided">Government Aided</option>
                    <option value="Private">Private</option>
  				</select>
  				</div>
			    <div class="col-md-12 mb-6">
			    <label>District</label>
			    <select class="custom-select d-block my-3" name="district" required>
				    <option value="">Select</option>
				    <option value="Ahmedabad">Ahmedabad</option>
				    <option value="Amreli">Amreli</option>
                    <option value="Anand">Anand</option>
                    <option value="Aravali">Aravali</option>
                    <option value="Banaskantha">Banaskantha</option>
                    <option value="Bharuch">Bharuch</option>
                    <option value="Bhavnagar">Bhavnagar</option>
                    <option value="Botad">Botad</option>
                    <option value="Chhota Udaipur">Chhota Udaipur</option>
                    <option value="Devbhoomi Dwarka">Devbhoomi Dwarka</option>
                    <option value="Dohad">Dohad</option>
                    <option value="Gandhinagar">Gandhinagar</option>
                    <option value="Gir Somnath">Gir Somnath</option>
                    <option value="Jamnagar">Jamnagar</option>
                    <option value="Junagadh">Junagadh</option>
                    <option value="Kachchh">Kachchh</option>
                    <option value="Kheda">Kheda</option>
                    <option value="Mahisagar">Mahisagar</option>
                    <option value="Mehsana">Mehsana</option>
                    <option value="Morbi">Morbi</option>
                    <option value="Narmada">Narmada</option>
                    <option value="Navsari">Navsari</option>
                    <option value="PanchMahal">PanchMahal</option>
                    <option value="24">Patan</option>
                    <option value="Patan">Porbandar</option>
                    <option value="Rajkot">Rajkot</option>
                    <option value="Sabarkantha">Sabarkantha</option>
                    <option value="Surat">Surat</option>
                    <option value="Surendranagar">Surendranagar</option>
                    <option value="Tapi">Tapi</option>
                    <option value="The Dangs">The Dangs</option>
                    <option value="Vadodara">Vadodara</option>
                    <option value="Valsad">Valsad</option>
  				</select>
  				</div>
  					<div class="col-md-12 mb-6">
	  				<label for="msg">School Address</label>
	    			<textarea class="form-control" rows="3" name="scaddr" required></textarea>
                    <div class="invalid-feedback">
        				Please provide school address.
      				</div>
	    			</div>
			  </div>
                <div class="form-check">
                <input type="checkbox" class="form-check-input" id="accept" required>
                <label class="form-check-label" for="accept">I hereby confirm that the I'm the Princle/Head of this School and the information given in this form is true, complete and accurate.</label>
                <div class="invalid-feedback">
        			You must accept the declaration
      			</div>
              </div>
			  <br>
        <center><button class="btn btn-primary" type="submit">Submit</button></center>

			</form>
            <br>
            <p>Your School is already registered? <a href="../login/">Login here!</a></p>
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
