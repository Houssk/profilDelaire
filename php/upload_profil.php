<?php
$ds          = DIRECTORY_SEPARATOR;  //1
$storeFolder = 'uploads';   //2

if (!empty($_FILES)) {
    $tempFile = $_FILES['file']['tmp_name'];
    $nameFile = $_FILES['file']['name'];
    $ext = pathinfo($nameFile, PATHINFO_EXTENSION);//3
    $targetPath = dirname( __FILE__ ) . $ds. $storeFolder . $ds;  //4
    $targetFile =  $targetPath."photo_profil.".$ext;  //5
    move_uploaded_file($tempFile,$targetFile); //6
    $size = getimagesize($targetFile);
    $width = $size[0];
    $height = $size[1];
    echo "width".$width." Height".$height;
    setcookie("realProfilWidth", $width, time() + (86400 * 30), "/");
    setcookie("realProfilHeight",$height, time() + (86400 * 30), "/");
}
?>
