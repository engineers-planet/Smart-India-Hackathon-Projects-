<?php
session_start();
if (isset($_SESSION['id'])) {
	session_destroy();
	header('Location: index.php');
}
else {
	echo "you are already logged out";
}