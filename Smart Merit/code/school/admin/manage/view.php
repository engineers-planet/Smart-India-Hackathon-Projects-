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
                margin:100px auto;
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
		          <a class="nav-link" href="dropout.php">Dropout</a>
		      </li>
		        <li class="nav-item">
		        <a class="nav-link" href="../logout.php">Logout</a>
		      </li>
		    </ul>
		  </div>
		</nav>

    <!--manage dashboard-->
		<?php
		session_start();
		if($_SESSION['ch'] == '1')
			echo "<center><h1 style='margin-top:150px;'>Academics Merit List</h1></center>";
		else if($_SESSION['ch'] == '2')
			echo "<center><h1 style='margin-top:150px;'>Sports Merit List</h1></center>";
		else if($_SESSION['ch'] == '3')
			echo "<center><h1 style='margin-top:150px;'>Arts Merit List</h1></center>";
		else if($_SESSION['ch'] == '4')
			echo "<center><h1 style='margin-top:150px;'>Club Merit List</h1></center>";
		echo "<br>";
		?>
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
