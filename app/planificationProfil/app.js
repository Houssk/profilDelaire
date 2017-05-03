/**
 * Created by Utilisateur on 10/04/2017.
 */
/**
 * Created by Karrach on 07/02/2017.
 */

var scene;
var camera;
var renderer;
var controls;
var plane;
var widthInitialeImage = parseFloat(sessionStorage.getItem("widthProfil"));
var heightInitialeImage = parseFloat(sessionStorage.getItem("heightProfil"));
var raycaster;
var particleMaterial;
var mouse;
var points = [];
var particle;
var pointDelaire3D;
var profilDelaire;
var compteurPoints = 0;
var conditionDelaire = true;
var validerPoint = true;
var droiteC1 = new Plan();
var droiteC2 = new Plan();
var droiteF5 = new Plan();
var droiteF4 = new Plan();
var droiteF6 = new Plan();
var droiteF2 = new Plan();
var droiteF8 = new Plan();
var distanceF4yInitiale = 0;
var distanceF6yInitiale = 0;
var distanceF5xInitiale = 0;
var odY = 0;
var enatY =0;
var ptoY = 0;
var enatX = 0;
var coX = 0 ;
var controlTransform;
var controlTransformCo;
var controlTransformF5;


function init() {

    /**
     * Initialisation de la scène
     * @author karrach houssam
     *
     * */

    console.log("let's rock Houssam");
    profilDelaire = new delaire();
    console.log(profilDelaire);
    droiteC1.setHeight(1);
    droiteC1.setWidth(widthInitialeImage);
    droiteC1.setColor(0xFFFF00);
    /**
     *
     */
    droiteC2.setHeight(1);
    droiteC2.setWidth(widthInitialeImage);
    droiteC2.setColor(0xFFFF00);
    /**
     *
     */
    droiteF5.setHeight(1);
    droiteF5.setWidth(widthInitialeImage);
    droiteF5.setColor(0xFFFF00);
    /**
     *
     */
    droiteF4.setHeight(1);
    droiteF4.setWidth(widthInitialeImage);
    droiteF4.setColor(0xFFFF00);
    /**
     *
     *
     */
    droiteF6.setHeight(1);
    droiteF6.setWidth(widthInitialeImage);
    droiteF6.setColor(0xFFFF00);
    /**
     *
     */
    droiteF2.setHeight(1);
    droiteF2.setWidth(widthInitialeImage);
    droiteF2.setColor(0xFFFF00);
    /**
     *
     */
    droiteF8.setHeight(1);
    droiteF8.setWidth(widthInitialeImage);
    droiteF8.setColor(0xFF0000);
    /**
     *
     * @type {THREE.Scene}
     */
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, 800 / 600, 1, 20000);
    camera.position.set(0, 0, 200);
    dLight = new THREE.AmbientLight(0xFFFFFF, 1.5);
    dLight.position.set(0,0,0);
    scene.add(dLight);


    renderer = new THREE.WebGLRenderer({ antaliasing : true });
    renderer.setSize(id("scene").clientWidth , 600);
    controlTransform = new THREE.TransformControls( camera, renderer.domElement );
    controlTransformCo = new THREE.TransformControls( camera, renderer.domElement );
    controlTransformF5 = new THREE.TransformControls( camera, renderer.domElement );

    id("scene").appendChild(renderer.domElement);
    var axisHelper = new THREE.AxisHelper( 100 );
    scene.add( axisHelper );
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableRotate = false;
    console.log(controls);
    pointDelaire3D = new THREE.Object3D();
    scene.add( pointDelaire3D );
    /**
     * Draw Plane geometry with doubleSide and map image face
     */
    var geometry = new THREE.PlaneGeometry(widthInitialeImage,heightInitialeImage,20);
    var material = new THREE.MeshStandardMaterial({  side : THREE.DoubleSide });
    var textureLoader = new THREE.TextureLoader();
    material.map = textureLoader.load( '../../php/uploads/photo_profil.'+getExtensionProfil() );
    plane = new THREE.Mesh(geometry,material);
    scene.add(plane);
    particleMaterial = new THREE.MeshPhongMaterial({ color : 0xFFFF00});
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    document.addEventListener('dblclick', onDocumentMouseDown, false);
    document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    console.log('control transform ',controlTransform);

    controlTransform.addEventListener( 'change', function () {
        /**
         *
         * @type {number}
         */
        controlTransform.children[0].children[0].children[4].material.transparent = true;
        controlTransform.children[0].children[0].children[4].material.opacity = 0;
        controlTransform.children[0].children[0].children[5].material.transparent = true;
        controlTransform.children[0].children[0].children[5].material.opacity = 0;
        /**
         *
         * @type {number}
         */
        console.log('  it s time to change ');
        console.log(-distanceF4yInitiale + droiteF4.getPlane().position.y);
        var dist = -distanceF4yInitiale + droiteF4.getPlane().position.y;
        droiteF6.getPlane().position.y = distanceF6yInitiale + dist;

        /**
         * Compute the new F4
         */
        droiteF4.getVecteurB().y = odY + dist;
        droiteF4.setVecteurA(droiteF4.drawParallel(droiteF4.getVecteurB(),droiteC1));

        /**
         * Compute the new F6
         */
        droiteF6.getVecteurA().y = enatY + dist;
        droiteF6.setVecteurB(droiteF6.drawParallel(droiteF6.getVecteurA(),droiteC2));
        /**
         * Compute the new F8
         */
        var intersection = droiteF2.getIntersection(droiteF6);
        droiteF8.setVecteurA(intersection);
        droiteF8.setVecteurB(profilDelaire.getCo());
        /**
         * Draw
         */
        scene.remove(droiteF8.getPlane());
        droiteF8.drawPlane();


    });
    controlTransformCo.addEventListener( 'change', function () {
        /**
         *
         * @type {number}
         */
        controlTransformCo.children[0].children[0].children[4].material.transparent = true;
        controlTransformCo.children[0].children[0].children[4].material.opacity = 0;
        controlTransformCo.children[0].children[0].children[5].material.transparent = true;
        controlTransformCo.children[0].children[0].children[5].material.opacity = 0;
        /**
         *
         * @type {number}
         */
        console.log(" time to change commissure ");
        profilDelaire.setCo(pointDelaire3D.children[7].position);
        droiteF8.setVecteurB(profilDelaire.getCo());
        console.log("getCo : ",profilDelaire.getCo().x);
        scene.remove(droiteF8.getPlane());
        droiteF8.drawPlane();
    });
    controlTransformF5.addEventListener( 'change', function () {
            console.log(" let's change F5");
        /**
         *
         * @type {number}
         */
        controlTransformF5.children[0].children[0].children[4].material.transparent = true;
        controlTransformF5.children[0].children[0].children[4].material.opacity = 0;
        controlTransformF5.children[0].children[0].children[5].material.transparent = true;
        controlTransformF5.children[0].children[0].children[5].material.opacity = 0;
        /**
         *
         * @type {number}
         */
            var dist = droiteF5.getPlane().position.x -distanceF5xInitiale ;
            /**
             * compute the new F6
             */
            droiteF6.vecteurA.x = enatX + dist;
            droiteF6.setVecteurB(droiteF6.drawParallel(droiteF6.getVecteurA(),droiteC2));
            /**
             * Compute the new F8
             */
            var intersection = droiteF2.getIntersection(droiteF6);
            droiteF8.setVecteurA(intersection);
           // profilDelaire.co.x = coX + dist;
            droiteF8.setVecteurB(profilDelaire.getCo());
            /**
             *  Draw
             */
            if(dist!=0){
                scene.remove(droiteF6.plane);
                scene.remove(droiteF8.plane);
                droiteF6.drawPlane();
                droiteF8.drawPlane();
                pointDelaire3D.children[3].position.x = profilDelaire.getNp().x + dist;
                //pointDelaire3D.children[7].pos
                controlTransformCo.detach();
                scene.remove(controlTransformCo);
                controlTransformCo.attach(pointDelaire3D.children[7]);
                controlTransformCo.setMode("translate");
                scene.add(controlTransformCo);
            }
    });
}
function onDocumentTouchStart( event) {
    console.log("let's rock touch");
    event.preventDefault();
    event.clientX = event.touches[0].clientX;
    event.clientY = event.touches[0].clientY;
    console.log(event.clientX);
    onDocumentMouseDown( event.clientX , event.clientY);
}
function onDocumentMouseDown( event ){
    console.log("let's rock mouseDown");
    var scene3D = $('#scene');
    event.preventDefault();
    mouse.x = ( (event.clientX -scene3D.offset().left + $(window).scrollLeft() ) / scene3D.width() ) * 2 - 1;
    mouse.y = - ( (event.clientY -scene3D.offset().top +$(window).scrollTop() )/ scene3D.height() ) * 2 + 1;
    console.log("mouse", mouse.x,mouse.y);
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObject( plane );
    if(intersects.length > 0){
        if(conditionDelaire && validerPoint){
            var pointSphere = new THREE.SphereGeometry(1,32,32);
            particle = new THREE.Mesh(pointSphere, particleMaterial);
            particle.position.copy(intersects[0].point);
            pointDelaire3D.add( particle );
            console.log(pointDelaire3D.children[0]);
            console.log(compteurPoints);
            compteurPoints ++;
            if(compteurPoints == 1) {
                profilDelaire.setM(intersects[0].point);
                validerPoint = false;

                $("#deletePoint").removeAttr("disabled");
                $("#validerPoint").removeAttr("disabled");
                droiteC1.setVecteurA(profilDelaire.getM());
                droiteC2.setVecteurA(profilDelaire.getM());
            }
            else if(compteurPoints == 2) {
                profilDelaire.setClp(intersects[0].point);
                $("#deletePoint").removeAttr("disabled");
                $("#validerPoint").removeAttr("disabled");
                droiteC1.setVecteurB(profilDelaire.getClp());
                validerPoint = false;
            }
            else if(compteurPoints == 3) {
                profilDelaire.setAra(intersects[0].point);
                $("#deletePoint").removeAttr("disabled");
                $("#validerPoint").removeAttr("disabled");
                validerPoint = false;
                droiteC2.setVecteurB(profilDelaire.getAra());

            }
            else if(compteurPoints == 4) {
                profilDelaire.setNp(intersects[0].point);
                $("#deletePoint").removeAttr("disabled");
                $("#validerPoint").removeAttr("disabled");
                validerPoint = false;
                droiteF5.setVecteurA(profilDelaire.getNp());
                droiteF5.setVecteurB(droiteF5.drawPerpendicular(profilDelaire.getNp(),droiteC1));
            }
            else if(compteurPoints == 5) {
                profilDelaire.setOd(intersects[0].point);
                $("#deletePoint").removeAttr("disabled");
                $("#validerPoint").removeAttr("disabled");
                odY = profilDelaire.getOd().y;
                validerPoint = false;
                droiteF4.setVecteurB(profilDelaire.getOd());
                droiteF4.setVecteurA(droiteF4.drawParallel(profilDelaire.getOd(),droiteC1));
                var intersection = droiteF4.getIntersection(droiteF5);
                var sphereTest = new THREE.Mesh(pointSphere, particleMaterial);
                sphereTest.position.copy(intersection);
                scene.add(sphereTest);
                droiteF6.setVecteurA(intersection);
                enatY = droiteF6.getVecteurA().y;
                enatX = droiteF6.getVecteurA().x;
                droiteF6.setVecteurB(droiteF6.drawParallel(intersection,droiteC2));
            }
            else if(compteurPoints == 6) {
                profilDelaire.setPts(intersects[0].point);
                $("#deletePoint").removeAttr("disabled");
                $("#validerPoint").removeAttr("disabled");
                validerPoint = false;
                droiteF2.setVecteurA(profilDelaire.getPts());
            }
            else if(compteurPoints == 7) {
                profilDelaire.setPti(intersects[0].point);
                $("#deletePoint").removeAttr("disabled");
                $("#validerPoint").removeAttr("disabled");
                validerPoint = false;
                droiteF2.setVecteurB(profilDelaire.getPti());
            }
            else if(compteurPoints == 8) {
                profilDelaire.setCo(intersects[0].point);
                $("#deletePoint").removeAttr("disabled");
                $("#validerPoint").removeAttr("disabled");
                validerPoint = false;
                console.log(profilDelaire);
                var intersection2 = droiteF2.getIntersection(droiteF6);
                var sphereTest = new THREE.Mesh(pointSphere, particleMaterial);
                sphereTest.position.copy(intersection2);
                scene.add(sphereTest);
                droiteF8.setVecteurA(intersection2);
                ptoY = droiteF8.getVecteurA().y;
                coX = profilDelaire.getCo().x;
                console.log(coX , " cox ");
                droiteF8.setVecteurB(profilDelaire.getCo());
            }
        }
    }
}
function validerDelaire() {

    $("#deletePoint").attr("disabled", "disabled");
    $("#validerPoint").attr("disabled", "disabled");
    validerPoint = true ;
    if(compteurPoints == 1) {
        id("imageDelaire").src ="../../img/img_delaire/clp.jpg";
    }
    else if(compteurPoints == 2) {
        id("imageDelaire").src ="../../img/img_delaire/ara.jpg";
    }
    else if(compteurPoints == 3) {
        id("imageDelaire").src ="../../img/img_delaire/np.jpg";
    }
    else if(compteurPoints == 4) {
        id("imageDelaire").src ="../../img/img_delaire/od.jpg";
    }
    else if(compteurPoints == 5) {
        id("imageDelaire").src ="../../img/img_delaire/pts.jpg";
    }
    else if(compteurPoints == 6) {
        id("imageDelaire").src = "../../img/img_delaire/pti.jpg";
    }
    else if(compteurPoints == 7) {
        id("imageDelaire").src ="../../img/img_delaire/commissure.jpg";
    }
    else if( compteurPoints == 8 ) {
        droiteC1.drawPlane();
        droiteC2.drawPlane();
        /**
         *
         */
        droiteF5.drawPlane();
        distanceF5xInitiale = droiteF5.getPlane().position.x;
        controlTransformF5.attach( droiteF5.getPlane() );
        controlTransformF5.setMode("translate");
        controlTransformF5.children[0].children[0].children[4].material.transparent = true;
        controlTransformF5.children[0].children[0].children[4].material.opacity = 0;
        controlTransformF5.children[0].children[0].children[5].material.transparent = true;
        controlTransformF5.children[0].children[0].children[5].material.opacity = 0;
        scene.add( controlTransformF5 );
        /**
         *
         */
        droiteF4.drawPlane();
        distanceF4yInitiale = droiteF4.getPlane().position.y;
        console.log("distanceF4yInitiale", distanceF4yInitiale);
        /**
         *
         */
        droiteF6.drawPlane();
        droiteF6.getPlane().name = "droiteF6v";
        distanceF6yInitiale = droiteF6.getPlane().position.y;
        console.log("distanceF6yInitiale", distanceF6yInitiale);
        /**
         *
         */
        droiteF2.drawPlane();
        /**
         *
         */
        droiteF8.drawPlane();
        droiteF8.getPlane().name = "droiteF8v";
        /**
         *
         */
        controlTransform.attach( droiteF4.getPlane() );
        controlTransform.setMode("translate");
        controlTransform.children[0].children[0].children[4].material.transparent = true;
        controlTransform.children[0].children[0].children[4].material.opacity = 0;
        controlTransform.children[0].children[0].children[5].material.transparent = true;
        controlTransform.children[0].children[0].children[5].material.opacity = 0;
        scene.add( controlTransform );
        controlTransformCo.attach( pointDelaire3D.children[7]);
        controlTransformCo.setMode("translate");
        controlTransformCo.children[0].children[0].children[4].material.transparent = true;
        controlTransformCo.children[0].children[0].children[4].material.opacity = 0;
        controlTransformCo.children[0].children[0].children[5].material.transparent = true;
        controlTransformCo.children[0].children[0].children[5].material.opacity = 0;
        scene.add( controlTransformCo );
        conditionDelaire = false;
    }
}
function deleteDelaire() {
    pointDelaire3D.remove(pointDelaire3D.children[compteurPoints-1]);
    compteurPoints--;
    $("#deletePoint").attr("disabled", "disabled");
    $("#validerPoint").attr("disabled", "disabled");
    validerPoint = true;
}
function drawSegment(vecteurA,vecteurB) {
    var material = new THREE.LineBasicMaterial({ color: 0x00ffFF , linewidth : 3});
    var geometry = new THREE.Geometry();
    geometry.vertices.push( vecteurA , vecteurB);
    var line = new THREE.Line( geometry, material );
    scene.add( line );
}
function getPente(vecteurA,vecteurB){
    var coeffDirecteur = (vecteurB.y-vecteurA.y)/(vecteurB.x-vecteurA.x);
    console.log("coeff Directeur :",coeffDirecteur);
    var pente = Math.atan(coeffDirecteur);
    return pente;
}
function drawPlane(vecteurA,vecteurB,color){
    var angle = getPente(vecteurA,vecteurB);
    var distance = vecteurA.distanceTo(vecteurB);
    var geometry = new THREE.PlaneGeometry(distance,20,20);
    var material = new THREE.MeshStandardMaterial({ color: color, side : THREE.DoubleSide });
    var plane = new THREE.Mesh(geometry,material);
    plane.position.set( (vecteurA.x+vecteurB.x)/2, (vecteurA.y+vecteurB.y)/2, 0 );
    plane.rotation.set( Math.PI/2, angle, 0);
    scene.add(plane);
}
function render() {
    requestAnimationFrame(render);
    renderer.render(scene,camera);
    raycaster.setFromCamera( mouse, camera );
}
init();
render();