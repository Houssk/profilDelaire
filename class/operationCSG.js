/**
 * Created by Utilisateur on 15/03/2017.
 */
function setGouttiereMaxillaire(box,maxillaire){

    var maxillaireBSP = new ThreeBSP( maxillaire );
    var boxBSP = new ThreeBSP( box );

    var gouttiereMaxillaireBSP = boxBSP.subtract(maxillaireBSP);

    var gouttiereMaxillaire = gouttiereMaxillaireBSP.toMesh( new THREE.MeshNormalMaterial({}) );

    scene.add(gouttiereMaxillaire);
}
function setGouttiereMandibule() {

}