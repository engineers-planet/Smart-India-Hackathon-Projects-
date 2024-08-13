
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
          <li class="nav-item">
              <a class="nav-link" href="index.php">Manage</a>
          </li>
					<li class="nav-item active">
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
			<form id="needs-validation" method="post" action="percent.php" novalidate>
			   <div class="row">
			    <div class="col">
			    <label>Year</label>
			    <select class="custom-select d-block my-3" name="year" required>
				    <option value="">Select</option>
				    <option value="2017">2017</option>
                    <option value="2018">2018</option>
  				</select>
  				</div>
        </div>
        <button class="btn btn-primary" type="submit">Submit</button>
    </form>
          <br>
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
