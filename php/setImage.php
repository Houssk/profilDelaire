<?php
/**
 * Created by PhpStorm.
 * User: Karrach
 * Date: 06/02/2017
 * Time: 10:57
 */
    session_start();
    $idPlanification = $_GET['idPlanification'];
    $ds = DIRECTORY_SEPARATOR;
    $storeFolder = 'uploads';

    include ('connexion.php');
    include('upload_face.php');
    $query = "insert into imageface(id,width, height) values ('', '$width', '$height')";
    $result = mysql_query($query,$dblink) or die (mysql_error($dblink));
    echo "</exemple>\n";
    include('deconnexion.php');
?>