<?php
$ds          = DIRECTORY_SEPARATOR;  //1
$storeFolder = 'uploads';   //2

if (!empty($_FILES)) {

    $tempFile = $_FILES['file']['tmp_name'];
    $nameFile = $_FILES['file']['name'];
    $ext = pathinfo($nameFile, PATHINFO_EXTENSION);
    $targetPath = dirname( __FILE__ ) . $ds. $storeFolder . $ds;
    $targetFile =  $targetPath."photo_face.".$ext;
    move_uploaded_file($tempFile,$targetFile);
    $size = getimagesize($targetFile);
    $width = $size[0];
    $height = $size[1];
    setcookie("realFaceWidth", $width, time() + (86400 * 30), "/");
    setcookie("realFaceHeight",$height, time() + (86400 * 30), "/");
    echo $_COOKIE["realFaceWidth"];
}
?>