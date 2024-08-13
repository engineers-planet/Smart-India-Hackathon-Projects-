<?php
session_start();
if (!isset($_SESSION['id']))
	header('Location: index.php');
else {
	session_destroy();
	echo "You are successfully logged out";
}
echo "<br><a href='index.php'>go to login page</a>";
?>
