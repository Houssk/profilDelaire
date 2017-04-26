/**
 * Created by Karrach on 21/02/2017.
 * class ImageFace
 */
/**
 *
 * @constructor
 */
function ImageFace() {

    this.width = 0;
    this.height = 0;
    this.widthPixel = 0;
    this.heightPixel = 0;
    this.coeff = 0;
    this.posPupillaireHY = 0;
    this.rotPupillaireHY = 0;
    this.posVerticalX = 0;
    this.rotVerticalY = 0;
    this.posPupillaireBY = 0;
    this.rotPupillaireBY = 0;
}
/**
 *  Getters
 * @returns {number}
 */
ImageFace.prototype.getWidth = function () {
    return this.width;
};
ImageFace.prototype.getHeight = function () {
    return this.height;
};
ImageFace.prototype.getWidthPixel = function () {
    return this.widthPixel;
};
ImageFace.prototype.getHeightPixel = function () {
    return this.heightPixel;
};
ImageFace.prototype.getCoeff = function () {
    return this.coeff;
};
ImageFace.prototype.getPosPupillaireHY = function () {
    return this.posPupillaireHY;
};
ImageFace.prototype.getRotPupillaireHY = function () {
    return this.rotPupillaireHY;
};
ImageFace.prototype.getRotVerticalX = function () {
    return this.rotVerticalY;
};
ImageFace.prototype.getPosVerticalX = function () {
    return this.posVerticalX;
};
ImageFace.prototype.getPosPupillaireBY = function () {
    return this.posPupillaireBY;
};
ImageFace.prototype.getRotPupillaireBY = function () {
    return this.rotPupillaireBY;
};
/**
 * Setters
 */
ImageFace.prototype.setWidth = function (width) {
    this.width = width;
};
ImageFace.prototype.setHeight = function (height) {
    this.height = height;
};
ImageFace.prototype.setWidthPixel = function (widthPixel) {
    this.widthPixel = widthPixel;
};
ImageFace.prototype.setHeightPixel = function (heigthPixel) {
    this.heightPixel = heigthPixel;
};
ImageFace.prototype.setCoeff = function (coeff) {
    this.coeff = coeff;
};
ImageFace.prototype.setPosPupillaireHY = function (posPupillaireHY) {
    this.posPupillaireHY = posPupillaireHY;
};
ImageFace.prototype.setRotPupillaireHY = function (rotPupillaireHY) {
    this.rotPupillaireHY = rotPupillaireHY;
};
ImageFace.prototype.setPosPupillaireBY = function (posPupillaireBY) {
    this.posPupillaireBY = posPupillaireBY;
};
ImageFace.prototype.setRotPupillaireBY = function (rotPupillaireBY) {
    this.rotPupillaireBY = rotPupillaireBY;
};
ImageFace.prototype.setPosVerticalX = function (posVerticalX) {
    this.posVerticalX = posVerticalX;
};
ImageFace.prototype.setRotVerticalY = function (rotVerticalY) {
    this.rotVerticalY = rotVerticalY;
};