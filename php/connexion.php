$<?php
/**
 * Created by PhpStorm.
 * User: Houssam
 * Date: 06/02/2017
 * Time: 09:52
 */
$dbhost="127.0.0.1:3306";
$dbuser="root";
$dbpass="";

$dblink=mysql_connect($dbhost,$dbuser,$dbpass);
mysql_select_db("planifmaxillo",$dblink);
?>