/**
 * Created by Karrach on 13/02/2017.
 */
/**
 *
 * @constructor
 */
function Plan(){
    /**
     *
     * @type {{x: number, y: number, z: number}}
     */
    this.vecteurA = {x : 0 , y : 0, z : 0};
    this.vecteurB = {x : 0 , y : 0, z : 0};
    /**
     *
     * @type {number}
     */
    this.color = 0xFFFFFF;
    /**
     *
     * @type {number}
     */
    this.height = 0;
    this.width = 0;
    this.plane = 0;
    this.distance = 0;
}
/**
 *
 * @returns {{x: number, y: number, z: number}|*}
 */
Plan.prototype.getVecteurA = function () {
    return this.vecteurA;
};
/**
 *
 * @returns {*}
 */
Plan.prototype.getVecteurB = function () {
    return this.vecteurB;
};
/**
 *
 * @returns {number|*}
 */
Plan.prototype.getColor = function () {
    return this.color;
};
/**
 *
 * @returns {*|number}
 */
Plan.prototype.getHeight = function () {
    return this.height;
};
/**
 *
 * @returns {number|*}
 */
Plan.prototype.getWidth = function () {
    return this.width;
};
Plan.prototype.getPlane = function () {
    return this.plane;
};
Plan.prototype.getDistance = function () {
    return this.distance;
};
/**
 *
 * @param vecteurA
 */
Plan.prototype.setVecteurA = function (vecteurA) {
    this.vecteurA = vecteurA;
};
/**
 *
 * @param vecteurB
 */
Plan.prototype.setVecteurB = function (vecteurB) {
    this.vecteurB = vecteurB;
};
/**
 *
 * @param color
 */
Plan.prototype.setColor = function (color) {
    this.color = color;
};
/**
 *
 * @param width
 */
Plan.prototype.setWidth = function (width) {
    this.width = width;
};
/**
 *
 * @param height
 */
Plan.prototype.setHeight = function (height) {
    this.height = height;
};

Plan.prototype.drawSegment = function() {
    var material = new THREE.LineBasicMaterial({ color: this.color , linewidth : 3});
    var geometry = new THREE.Geometry();
    geometry.vertices.push( this.vecteurA , this.vecteurB);
    var line = new THREE.Line( geometry, material );
    scene.add( line );
};
/**
 *
 * @returns {number}
 */
Plan.prototype.getPente = function (){
    var coeffDirecteur = (this.vecteurB.y - this.vecteurA.y)/(this.vecteurB.x - this.vecteurA.x);
    console.log("coeff Directeur :",coeffDirecteur);
    var pente = Math.atan(coeffDirecteur);
    return pente;
};
Plan.prototype.drawPlane = function () {
    var angle =this.getPente(this.vecteurA,this.vecteurB);
    var geometry = new THREE.BoxGeometry(this.width,this.height,0.5);
    var material = new THREE.MeshStandardMaterial({ color: this.color, side : THREE.DoubleSide });
    this.plane = new THREE.Mesh(geometry,material);
    this.plane.position.set( (this.vecteurA.x + this.vecteurB.x)/2, (this.vecteurA.y+this.vecteurB.y)/2, 0 );
    this.plane.rotation.set( Math.PI/2, angle, 0);
    scene.add(this.plane);
};
Plan.prototype.drawPlaneDistance = function () {
    var angle =this.getPente(this.vecteurA,this.vecteurB);
    this.distance = this.vecteurA.distanceTo(this.vecteurB);
    console.log("dsitance class " , this.distance);
    var geometry = new THREE.PlaneGeometry(this.distance,20,20);
    var material = new THREE.MeshStandardMaterial({ color: this.color, side : THREE.DoubleSide });
    this.plane = new THREE.Mesh(geometry,material);
    this.plane.position.set( (this.vecteurA.x + this.vecteurB.x)/2, (this.vecteurA.y+this.vecteurB.y)/2, 0 );
    this.plane.rotation.set( Math.PI/2, angle, 0);
    scene.add(this.plane);
};
Plan.prototype.removePlan = function () {
    scene.remove(this.plane);
};
Plan.prototype.computeDistance = function () {
    this.distance = this.vecteurA.distanceTo(this.vecteurB);
};
/**
 *
 * @returns {number}
 */
Plan.prototype.getMediane = function () {
    return (this.vecteurA.x + this.vecteurB.x)/2;
};

/**
 * this function allow us to determinate the coeff for simplified function ( m p )
 * @returns {{m: *, p: number}}
 */
Plan.prototype.makeFunction = function () {
    /**
     *  Y = mX + P
     */
   var m = Math.atan(this.vecteurB.y - this.vecteurA.y)/(this.vecteurB.x - this.vecteurA.x);
   var p = this.vecteurA.y - m * this.vecteurA.x;
   var func = {m : m, p : p};
   return func;
};
/**
 *
 * @param planA
 * @param planB
 * @returns {{x: number, y: *}}
 */
Plan.prototype.getIntersection = function (planB) {
    var m1 = (this.vecteurB.y - this.vecteurA.y)/(this.vecteurB.x - this.vecteurA.x);
    var p1 = this.vecteurA.y - m1 * this.vecteurA.x;
    var m2 = (planB.vecteurB.y - planB.vecteurA.y)/(planB.vecteurB.x - planB.vecteurA.x);
    var p2 = planB.vecteurA.y - m2 * planB.vecteurA.x;
    var functionA = {m: m1 , p: p1 };
    var functionB = {m: m2 , p: p2 };
    var x = (functionB.p - functionA.p) / (functionA.m - functionB.m);
    var y = functionA.m*x + functionA.p;
    var intersection = {x : x , y : y , z : 0};
    return intersection;
};
Plan.prototype.drawParallel = function (vecteur, plan) {

    var m = plan.getPente();
    var p = vecteur.y - m * vecteur.x;
    var vecteurX = vecteur.x+1 ;
    var vecteurY = vecteurX*m + p ;
    var vecteurI = {x:vecteurX, y:vecteurY , z:0};
    return vecteurI;

};

Plan.prototype.drawPerpendicular = function (vecteur, plan) {
    var m = -1/(plan.getPente());
    var p = vecteur.y - m * vecteur.x;
    var vecteurY = vecteur.y+1 ;
    var vecteurX = (vecteurY - p)/m ;
    var vecteurI = {x:vecteurX, y:vecteurY , z:0};
    return vecteurI;
    
};
Plan.prototype.transparent = function () {
    this.plane.material.transparent = true;
    this.plane.material.opacity = 0;
}

