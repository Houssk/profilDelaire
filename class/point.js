/**
 * Created by Utilisateur on 08/02/2017.
 */
/**
 *
 * @param x
 * @param y
 * @param z
 * @constructor
 */
function Point() {
   this.vecteur = {x:0,y:0,z:0};
}
Point.prototype.getX = function (){
    return this.x;
};
Point.prototype.getY = function (){
    return this.y;
};
Point.prototype.getZ = function (){
    return this.z;
};
Point.prototype.getDistance = function(pointA,pointB){
    return Math.round(pointA.distanceTo(pointB));
};
Point.prototype.getAngle = function (vecteurA , vecteurB) {
    var produitScalaire = vecteurA.x*vecteurB.x + vecteurA.y*vecteurB.y + vecteurA.z*vecteurB*z;
    var argumentVecteurA = Math.sqrt( Math.pow(vecteurA.x,2) + Math.pow(vecteurA.y,2) + Math.pow(vecteurA.z,2) );
    var argumentVecteurB = Math.sqrt( Math.pow(vecteurB.x,2) + Math.pow(vecteurB.y,2) + Math.pow(vecteurB.z,2) );
    return  Math.acos( (produitScalaire) / (argumentVecteurA*argumentVecteurB));
};