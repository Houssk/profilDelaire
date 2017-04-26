/**
 * Created by Utilisateur on 06/02/2017.
 */
function setImage(id) {
   /* var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    xhr.open("GET", '../php/setImage.php?idPlanification='+idPlanification+'', true);
    xhr.send(null);
    xhr.responseText;*/
    var value =  getCookie("realFaceWidth");
    var value2 = getCookie("realFaceHeight");
    sessionStorage.setItem("realwidth",value);
    sessionStorage.setItem("realProfilHeight",value2);
    console.log(value);
}
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}