<?php
include '../../dbconnection/connect.php';
$conn = connect();
//$sql="create table colleges(id int auto_increment primary key not null,name varchar(50) not null,pass varchar(30) not null,email varchar(50) not null,ph varchar(15) not null,type varchar(30) not null,addr TEXT not null,district varchar(50) not null);";
//$sql="create table students(scid TEXT not null,id TEXT not null,name TEXT not null,class TEXT not null,ph1 int not null,ph2 int,adhar TEXT not null,fname TEXT not null,fadhar TEXT not null,addr TEXT not null);";
//$sql="create table boards(bid TEXT not null,bname TEXT not null,AffType TEXT not null,ph int not null);";
$sql="create table marks(scid TEXT not null,class TEXT not null,id TEXT not null,academics int not null,sports int,arts int);";
if ($conn -> query($sql))
    echo "Table created";
else {
	echo $conn -> error;
}
?>