/**
 * Created by Utilisateur on 08/02/2017.
 */

/**
 *
 * @param n
 * @param m
 * @param cla
 * @param clp
 * @param mp
 * @param ara
 * @param od
 * @param pti
 * @param pts
 * @param atl
 * @param ena
 * @param go
 */
function profilDelaire(){
    /**
     *
     * @type {{x: number, y: number, z: number}}
     */
    this.m = {x:0, y:0 ,z:0};
    this.n = {x:0, y:0 ,z:0};
    this.cla = {x:0, y:0 ,z:0};
    this.clp = {x:0, y:0 ,z:0};
    this.mp = {x:0, y:0 ,z:0};
    this.ara = {x:0, y:0 ,z:0};
    this.od = {x:0, y:0 ,z:0};
    this.pti = {x:0, y:0 ,z:0};
    this.pts = {x:0, y:0 ,z:0};
    this.atl = {x:0, y:0 ,z:0};
    this.ena = {x:0, y:0 ,z:0};
    this.go = {x:0, y:0 ,z:0};
    this.point1 = {x:0, y:0,z:0};
    this.point2 = {x:0, y:0,z:0};
    this.point3 = {x:0, y:0,z:0};
    this.point4 = {x:0, y:0,z:0};
    this.point5 = {x:0, y:0,z:0};
    this.pointCorrespondance = {x:0, y:0,z:0}
}
/**
 * Getters
 * @returns {*}
 */
profilDelaire.prototype.getN = function () {
    return this.n;
};
profilDelaire.prototype.getM = function () {
    return this.m;
};
profilDelaire.prototype.getCla = function () {
    return this.cla;
};
profilDelaire.prototype.getClp = function () {
    return this.clp;
};
profilDelaire.prototype.getMp = function () {
    return this.mp;
};
profilDelaire.prototype.getAra = function () {
    return this.ara;
};
profilDelaire.prototype.getOd = function () {
    return this.od;
};
profilDelaire.prototype.getPti = function () {
    return this.pti;
};
profilDelaire.prototype.getPts = function () {
    return this.pts;
};
profilDelaire.prototype.getAtl = function () {
    return this.atl;
};
profilDelaire.prototype.getEna = function () {
    return this.ena;
};
profilDelaire.prototype.getGo = function () {
    return this.go;
};
profilDelaire.prototype.getPoint1 = function () {
    return this.point1;
};
profilDelaire.prototype.getPoint2 = function () {
    return this.point2;
};
profilDelaire.prototype.getPoint3 = function () {
    return this.point3;
};
profilDelaire.prototype.getPoint4 = function () {
    return this.point4;
};
profilDelaire.prototype.getPoint5 = function () {
    return this.point5;
};
profilDelaire.prototype.getPointCorrespondance = function () {
    return this.pointCorrespondance;
};

/**
 * Setters
 * @param {*}
 */
profilDelaire.prototype.setN = function (n) {
     this.n = n;
};
profilDelaire.prototype.setM = function (m) {
    this.m = m;
};
profilDelaire.prototype.setCla = function (cla) {
    this.cla = cla;
};
profilDelaire.prototype.setClp = function (clp) {
    this.clp = clp;
};
profilDelaire.prototype.setMp = function (mp) {
    this.mp = mp;
};
profilDelaire.prototype.setAra = function (ara) {
    this.ara = ara;
};
profilDelaire.prototype.setOd = function (od) {
    this.od = od;
};
profilDelaire.prototype.setPti = function (pti) {
    this.pti = pti;
};
profilDelaire.prototype.setPts = function (pts) {
    this.pts = pts;
};
profilDelaire.prototype.setAtl = function (atl) {
    this.atl = atl;
};
profilDelaire.prototype.setEna  = function (ena) {
    this.ena = ena;
};
profilDelaire.prototype.setGo = function (go) {
    this.go = go;
};
profilDelaire.prototype.setPoint1 = function (point1) {
    this.point1 = point1;
};
profilDelaire.prototype.setPoint2 = function (point2) {
    this.point2 = point2;
};
profilDelaire.prototype.setPoint3 = function (point3) {
    this.point3 = point3;
};
profilDelaire.prototype.setPoint4 = function (point4) {
    this.point4 = point4;
};
profilDelaire.prototype.setPoint5 = function (point5) {
    this.point5 = point5;
};
profilDelaire.prototype.setPointCorrespondance = function (pointCorrespondance) {
    this.pointCorrespondance = pointCorrespondance;
};






