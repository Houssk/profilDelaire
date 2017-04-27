/**
 * Created by Karrach on 07/02/2017.
 */

var scene;
var camera;
var renderer;
var controls;
var widthInitialeImage = 200;
var heightInitialeImage = 120;
var realProfilWidth =  getCookie("realProfilWidth");
var realProfilHeight = getCookie("realProfilHeight");
console.log(realProfilWidth+"x"+realProfilHeight);
var particleMaterial;
var raycaster;
var mouse;
var validerPoint = true;
var distanceIsValid = true;
var compteurPoints = 0;
var distance = {
    x: 0,
    y : 0
};
var pointForDistance = new THREE.Object3D();
var plane;

function init() {

    /**
     * Initialisation de la scène
     * @author karrach houssam
     *
     * */
    console.log("let's rock Houssam");
    scene = new THREE.Scene();
    camera =  new THREE.PerspectiveCamera( 35, 800 / 600, 1, 20000 );
    camera.position.set(0,0,140);
    dLight = new THREE.DirectionalLight(0xFFFFFF, 1);
    dLight.position.set(5,10,15);
    scene.add(dLight);
    var dLight2 = new THREE.DirectionalLight(0xFFFFFF, 1);
    dLight2.position.set(5,10,-20);
    scene.add(dLight2);

    renderer = new THREE.WebGLRenderer({ antaliasing : true });
    renderer.setSize(id("scene").clientWidth , 600);

    id("scene").appendChild(renderer.domElement);
    var axisHelper = new THREE.AxisHelper( 100 );
    scene.add( axisHelper );
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableRotate = false;

    /**
     * Draw Plane geometry with doubleSide and map image face
     */

    var geometry = new THREE.PlaneGeometry(widthInitialeImage,heightInitialeImage,20);
    var material = new THREE.MeshStandardMaterial({  side : THREE.DoubleSide });
    var textureLoader = new THREE.TextureLoader();
    material.map = textureLoader.load( '../../php/uploads/photo_profil.'+getExtensionProfil() );
    plane = new THREE.Mesh(geometry,material);
    scene.add(plane);
    scene.add(pointForDistance);

    /**
     *
     * Raycating
     */
    particleMaterial = new THREE.MeshPhongMaterial({color: 0xFF0000});
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    document.addEventListener('dblclick', onDocumentMouseDown, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    /**
     *
     * @type {THREE.PlaneGeometry}
     */

    $('#myHandleForm').validator().on('submit', function (e) {
        if (e.isDefaultPrevented()) {
            console.log("not valid ");
        } else {
            var valeurCalibrage =  parseFloat($('#valeurCalibre').val());
            var valeurScale = distance.x.distanceTo(distance.y);
            console.log("valeurScale",valeurScale);
            var dimension = computeCoeff(widthInitialeImage,heightInitialeImage,valeurScale,valeurCalibrage,realProfilWidth,realProfilHeight);
            sessionStorage.setItem("valeurCalibrage",valeurCalibrage);
            sessionStorage.setItem("widthProfil",dimension[0]);
            sessionStorage.setItem("heightProfil",dimension[1]);
            id("send").style.display = "none";
            id("valeurCalibre").style.display = "none";
            id("nextLoad").style.display ="";
            $( "#slider" ).slider( "disable" );
            $( "#slider2" ).slider( "disable" );
            $( "#slider3" ).slider( "disable" );
            $("#moinsVertical").attr("disabled", "disabled");
            $("#plusVertical").attr("disabled", "disabled");
            $("#plusScale").attr("disabled", "disabled");
            $("#moinsScale").attr("disabled", "disabled");
            $("#plusHorizontal").attr("disabled", "disabled");
            $("#moinsHorizontal").attr("disabled", "disabled");
            calibrationProfilStorage(realProfilWidth,realProfilHeight,dimension[0],dimension[1],valeurScale*2);
            return false;
        }
    })

}
function onDocumentTouchStart(event) {
    console.log("let's rock touch");
    event.preventDefault();
    event.clientX = event.touches[0].clientX;
    event.clientY = event.touches[0].clientY;
    console.log(event.clientX);
    onDocumentMouseDown(event.clientX, event.clientY);
}
function onDocumentMouseDown(event) {
    console.log("let's rock mouseDown");
    var scene3D = $('#scene');
    event.preventDefault();
    mouse.x = ( (event.clientX - scene3D.offset().left + $(window).scrollLeft() ) / scene3D.width() ) * 2 - 1;
    mouse.y = -( (event.clientY - scene3D.offset().top + $(window).scrollTop() ) / scene3D.height() ) * 2 + 1;
    console.log("mouse", mouse.x, mouse.y);
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObject(plane);
    if (intersects.length > 0) {
        if (distanceIsValid && validerPoint) {
            var pointSphere = new THREE.SphereGeometry(0.5, 32, 32);
            particle = new THREE.Mesh(pointSphere, particleMaterial);
            particle.position.copy(intersects[0].point);
            pointForDistance.add(particle);
            compteurPoints++;
            if (compteurPoints == 1) {
                distance.x = intersects[0].point;
                validerPoint = false;
                $("#deletePoint").removeAttr("disabled");
                $("#validerPoint").removeAttr("disabled");
            }
            else if (compteurPoints == 2) {
                distance.y = intersects[0].point;
                $("#deletePoint").removeAttr("disabled");
                $("#validerPoint").removeAttr("disabled");
                distanceIsValid = false;
                validerPoint = false;
            }
        }
    }
}
function validerDelaire() {

    validerPoint = true;
    if (compteurPoints == 1) {
        id("imageDistance").src = "../../img/calibrageProfil/pointB.jpg";
        $("#deletePoint").attr("disabled", "disabled");
        $("#validerPoint").attr("disabled", "disabled");
    }
    else if(compteurPoints == 2 ){
        $("#deletePoint").attr("disabled", "disabled");
        $("#validerPoint").attr("disabled", "disabled");
        id("myHandleForm").style.display = "";
    }
    console.log(compteurPoints);
}

function deleteDelaire() {
    pointForDistance.remove(pointForDistance.children[compteurPoints - 1]);
    distanceIsValid = true;
    compteurPoints--;
    $("#deletePoint").attr("disabled", "disabled");
    $("#validerPoint").attr("disabled", "disabled");
    validerPoint = true;
}
function render() {
    requestAnimationFrame(render);
    renderer.render(scene,camera);
}
init();
render();