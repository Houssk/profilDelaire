/**
 * Created by Utilisateur on 01/02/2017.
 */

function isUpload(boolProfil){
    if(boolProfil){
        return true;
    }
    else return false;
}

function setExtensionFace(ext) {
    sessionStorage.setItem('extensionFace',ext);
}
function setExtensionProfil(ext) {
    sessionStorage.setItem('extensionProfil',ext);
}
function getExtensionFace() {
    return sessionStorage.getItem('extensionFace');
}
function getExtensionProfil() {
    return sessionStorage.getItem('extensionProfil');
}
function id(id) {
    return document.getElementById(id);
}

function computeCoeff(width,height,valeurScale,valeurMesuree,realWidth,realHeight) {
    var coeff = valeurScale/valeurMesuree;
    var coeffPixel = realWidth/realHeight;
    var heightMm = height/coeff;
    var widthMm = heightMm*coeffPixel;
    return [widthMm,heightMm];
}

function calibrationFaceStorage(widthPixelFace,heightPixelFace,widthFace,heightFace,coeffFace){
    sessionStorage.setItem('widthPixelFace',widthPixelFace);
    sessionStorage.setItem('heightPixeFacel',heightPixelFace);
    sessionStorage.setItem('widthFace',widthFace);
    sessionStorage.setItem('heightFace',heightFace);
    sessionStorage.setItem('coeffFace',coeffFace);
}
function planificationFaceStorage(posPupillaireHY,rotPupillaireHY,posVerticalX,rotVerticalY,posPupillaireBY,rotPupillaireBY,pointCanineX,pointCanineY) {
    sessionStorage.setItem('posPupillaireHY',posPupillaireHY);
    sessionStorage.setItem('rotPupillaireHY',rotPupillaireHY);
    sessionStorage.setItem('posVerticalX',posVerticalX);
    sessionStorage.setItem('rotVerticalY',rotVerticalY);
    sessionStorage.setItem('posPupillaireBY',posPupillaireBY);
    sessionStorage.setItem('rotPupillaireBY',rotPupillaireBY);
    sessionStorage.setItem('pointCanineX', pointCanineX);
    sessionStorage.setItem('pointCanineY', pointCanineY);
}
function calibrationProfilStorage(widthPixelProfil,heightPixelProfil,widthProfil,heightProfil,coeffProfil) {
    sessionStorage.setItem('widthPixelProfil',widthPixelProfil);
    sessionStorage.setItem('heightPixeProfil',heightPixelProfil);
    sessionStorage.setItem('widthProfil',widthProfil);
    sessionStorage.setItem('heightProfil',heightProfil);
    sessionStorage.setItem('coeffProfil',coeffProfil);
}
function planificationProfilStorage(posPlanAX,posPlanBX,posPlanCX,posPlanAY,posPlanBY,posPlanCY,pentePlanA,pentePlanB,pentePlanC,posCondyleX,posCondyleY,distanceA,distanceB,distanceC,point2X,point2Y) {
    sessionStorage.setItem('posPlanAX',posPlanAX);
    sessionStorage.setItem('posPlanBX',posPlanBX);
    sessionStorage.setItem('posPlanCX',posPlanCX);
    sessionStorage.setItem('posPlanAY',posPlanAY);
    sessionStorage.setItem('posPlanBY',posPlanBY);
    sessionStorage.setItem('posPlanCY',posPlanCY);
    sessionStorage.setItem('pentePlanA',pentePlanA);
    sessionStorage.setItem('pentePlanB',pentePlanB);
    sessionStorage.setItem('pentePlanC',pentePlanC);
    sessionStorage.setItem('posCondyleX',posCondyleX);
    sessionStorage.setItem('posCondyleY',posCondyleY);
    sessionStorage.setItem('distanceA',distanceA);
    sessionStorage.setItem('distanceB',distanceB);
    sessionStorage.setItem('distanceC',distanceC);
    sessionStorage.setItem('point2X',point2X);
    sessionStorage.setItem('point2Y',point2Y);
}
function get(tag) {
    return parseFloat(sessionStorage.getItem(tag));
}
function setOpacity(mesh,bool){
    if(bool) {
        mesh.material.transparent = false;
        mesh.material.opacity = 1;
    }
    else if (!bool) {
        mesh.material.transparent = true;
        mesh.material.opacity = 0;
    }
}