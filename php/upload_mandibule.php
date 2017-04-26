<?php
$ds          = DIRECTORY_SEPARATOR;  //1
$storeFolder = 'uploads';   //2

if (!empty($_FILES)) {
    $tempFile = $_FILES['file']['tmp_name'];
    $nameFile = $_FILES['file']['name'];
    $ext = pathinfo($nameFile, PATHINFO_EXTENSION);
    $targetPath = dirname( __FILE__ ) . $ds. $storeFolder . $ds;
    $targetFile =  $targetPath."mandibule.".$ext;
    move_uploaded_file($tempFile,$targetFile);
}
?>