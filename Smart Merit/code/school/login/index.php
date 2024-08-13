<?php
include '../../dbconnection/connect.php';
include '../../aes.php';
session_start();
$isvalid = true;
$sql="select id,name from colleges where id='".$_POST['id']."' and pass='".encrypt_decrypt('encrypt',$_POST['pass'])."';";
$conn = connect();
$res = $conn -> query($sql);
if ($res) {
	if ($res -> num_rows != 1) {
		$isvalid = false;
		disconnect($conn);
	}
	else {
		$row = $res -> fetch_assoc();
		$_SESSION['id'] = $_POST['id'];
		$_SESSION['name'] = $row['name'];
		disconnect($conn);
		header('Location: manage/index.php');
	}
}
else {
	echo $res -> error;
	disconnect($conn);
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
    <title>Login</title>
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
        <li class="nav-item">
            <a class="nav-link" href="../update">UPDATE REQUEST</a>
          </li>
          <li class="nav-item dropdown active">
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
			<form id="needs-validation" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method = 'post' novalidate>
				<?php
				if (isset($_SESSION['err'])) {
				    echo "<p style='color:red';>".$_SESSION['err']."</p>";
					unset($_SESSION['err']);
				}
				?>
                <h1>Schools Login Here</h1>
                <hr>
			  <div class="row">
			    <div class="col-sm-12 mb-6">
			      <label for="schoolID">School ID</label>
                    <small id="idHelp" class="form-text text-muted">Login ID</small>
			      <input type="text" class="form-control" id="schoolID" name ="id" required>
			      <div class="invalid-feedback">
        			Please Enter Login ID.
      			</div>
			    </div>
                  <div class="col-sm-12 mb-6">
			      <label for="schoolPass">Password</label>
                    <small id="idHelp" class="form-text text-muted">Login Password</small>
			      <input type="text" class="form-control" id="schoolPass" name="pass" required>
			      <div class="invalid-feedback">
        			Please Enter Password.
      			</div>
			    </div>
                </div>
                 <?php
                 if (!$isvalid and $_SERVER['REQUEST_METHOD']=='POST')
                     echo "<p style='color:red';>id or password is incorrect</p>";
                 ?>
			  <br>
			  <center><button class="btn btn-primary" type="submit">Submit</button></center>
			</form>
            <br>
            <p>Your School is not registered yet? <a href="../register/">Register here!</a></p>
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
