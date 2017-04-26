/**
 * Created by Karrach on 23/02/2017.
 * Class Planification
 */
/**
 *
 * @constructor
 */
function Planification() {
    this.isCalibrationFace = false;
    this.isPlanificationFace = false;
    this.isCalibrationProfil = false;
    this.isPlanificationProfil = false;
    this.isDownloadSTL = false;
    this.isDownloadPicture = false;
    this.isPlanification = false;
}
/**
 * Getters
 * @returns {boolean}
 */
Planification.prototype.getIsCalibrationFace = function () {
    return this.isCalibrationFace;
};
Planification.prototype.getIsCalibrationProfil = function () {
    return this.isCalibrationProfil;
};
Planification.prototype.getIsPlanificationFace = function () {
    return this.isPlanificationFace;
};
Planification.prototype.getIsPlanificationProfil = function () {
    return this.isPlanificationProfil;
};
Planification.prototype.getIsDownloadSTL = function () {
    return this.isDownloadSTL;
};
Planification.prototype.getIsDownloadPicture = function () {
    return this.isDownloadPicture;
};
Planification.prototype.getIsPlanification = function () {
    return this.isPlanification;
};
/**
 * Setters
 * @param isCalibrationFace
 */
Planification.prototype.setIsCalibrationFace = function (isCalibrationFace) {
    this.isCalibrationFace = isCalibrationFace;
};
Planification.prototype.setIsPlanificationFace = function (isPlanificationFace) {
    this.isPlanificationFace = isPlanificationFace;
};
Planification.prototype.setIsCalibrationProfil = function(isCalibrationProfil) {
    thiisCalibrationProfil = isCalibrationProfil;
};
Planification.prototype.setIsPlanificationProfil = function (isPlanificationProfil) {
    this.isPlanificationProfil = isPlanificationProfil;
};
Planification.prototype.setIsDownloadSTL = function (isDowloadSTL) {
    this.isDownloadSTL = isDowloadSTL;
};
Planification.prototype.setIsDownloadPicture = function (isDownloadPicture) {
    this.isDownloadPicture = isDownloadPicture;
};
Planification.prototype.setIsPlanification = function (isPlanification) {
    this.isPlanification = isPlanification;
};
