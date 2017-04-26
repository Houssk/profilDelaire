<?php
/**
 * Created by PhpStorm.
 * User: Utilisateur
 * Date: 01/02/2017
 * Time: 11:04
 */

echo "hey";
$data = $_POST['data'];
echo $data;
$ds          = DIRECTORY_SEPARATOR;  //1
$storeFolder = 'uploads/';   //2
$path = $storeFolder.$data;
echo $path;
unlink($path);
