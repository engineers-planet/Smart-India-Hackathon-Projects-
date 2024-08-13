<?php
include '../../../dbconnection/connect.php';
if($_SERVER['REQUEST_METHOD']=="POST") {
	echo "<center><h1 style='margin-top:120px;'>".$_POST['year']."</h1></center>";
	$conn = connect();
	$year = $_POST['year'];
	$sql = "select dropout.reason from dropout inner join colleges on dropout.scid=colleges.id where dropout.year='".$year."';";
	$res = $conn -> query($sql) or die($conn -> error);
	$c1 = 0;
	$c2 = 0;
	$c4 = 0;
	for($i=0;$i<$res->num_rows;$i++) {
		$row = $res -> fetch_assoc();
		if($row['reason'] == "Finance")
			$c1++;
		else if($row['reason'] == "Health Issues")
			$c2++;
		else if($row['reason'] == "Unknown")
			$c4++;
	}
	$f = fopen('final.csv','w') or die("Error");
	fwrite($f,"Finance,");
	$m = ($c1*100)/($c1+$c2+$c4);
	fwrite($f,$m);
	fwrite($f,"\n");
	$m = ($c2*100)/($c1+$c2+$c4);
	fwrite($f,"Health Issues,");
	fwrite($f,$m);
	fwrite($f,"\n");
	$m = ($c4*100)/($c1+$c2+$c4);
	fwrite($f,"Unknown,");
	fwrite($f,$m);
	fwrite($f,"\n");
	fclose($f);
	system('python3 new.py',$r);
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
    <section class="jumbotron" style="background-color:#ffffff;">
			<center>
				<img src="New1.png" class="img-fluid" alt="pi chart dropout"><br><br>
				<a class="btn" style="color:white;background-color:#1F77B4;" href="finance.php" role="button">Finance</a>&nbsp
				<a class="btn" style="color:white;background-color:#FF7F0E;" href="health.php" role="button">Health Issues</a>&nbsp
				<a class="btn" style="color:white;background-color:#2CA02C;" href="unknown.php" role="button">Unknown</a>
			</center>
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
