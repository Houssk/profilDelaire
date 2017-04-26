/**
 * Created by Utilisateur on 10/04/2017.
 */

/**
 *
 * @param np n'
 * @param m
 * @param clp
 * @param ara
 * @param od
 * @param pti
 * @param pts
 * @param co
 */
function delaire(){
    /**
     *
     * @type {{x: number, y: number, z: number}}
     */
    this.m = {x:0, y:0 ,z:0};
    this.np = {x:0, y:0 ,z:0};
    this.clp = {x:0, y:0 ,z:0};
    this.ara = {x:0, y:0 ,z:0};
    this.od = {x:0, y:0 ,z:0};
    this.pti = {x:0, y:0 ,z:0};
    this.pts = {x:0, y:0 ,z:0};
    this.co = {x:0, y:0 ,z:0};
}
/**
 * Getters
 * @returns {*}
 */
delaire.prototype.getNp = function () {
    return this.np;
};
delaire.prototype.getM = function () {
    return this.m;
};
delaire.prototype.getClp = function () {
    return this.clp;
};
delaire.prototype.getAra = function () {
    return this.ara;
};
delaire.prototype.getOd = function () {
    return this.od;
};
delaire.prototype.getPti = function () {
    return this.pti;
};
delaire.prototype.getPts = function () {
    return this.pts;
};
delaire.prototype.getCo = function () {
    return this.co;
};

/**
 * Setters
 * @param {*}
 */
delaire.prototype.setNp = function (np) {
    this.np = np;
};
delaire.prototype.setM = function (m) {
    this.m = m;
};
delaire.prototype.setClp = function (clp) {
    this.clp = clp;
};
delaire.prototype.setAra = function (ara) {
    this.ara = ara;
};
delaire.prototype.setOd = function (od) {
    this.od = od;
};
delaire.prototype.setPti = function (pti) {
    this.pti = pti;
};
delaire.prototype.setPts = function (pts) {
    this.pts = pts;
};
delaire.prototype.setCo = function (co) {
    this.co = co;
};






