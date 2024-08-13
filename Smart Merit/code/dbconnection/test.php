<?php
include 'connect.php';
$conn=connect();
echo "Connected Successfully";
disconnect($conn);
?>
