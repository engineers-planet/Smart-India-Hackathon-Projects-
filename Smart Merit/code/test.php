<?php
$res = system('python test.py',$op);
$fp = fopen('data','r');
while (!feof($fp))
	echo fgets($fp)."<br>";
?>