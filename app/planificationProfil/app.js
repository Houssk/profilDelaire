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
var scene3D = $('#scene');

var odY = 0;
var enatY =0;
var ptoY = 0;
var enatX = 0;
var coX = 0 ;
var npX = 0;

var controlTransform;
var controlTransformCo;
var controlTransformF5;
var controlTransformPts;
var controlTransformPti;
var controlTransformM;
var controlTransformCla;
var controlTransformAra;


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
    controlTransformPts = new THREE.TransformControls( camera, renderer.domElement );
    controlTransformPti = new THREE.TransformControls( camera, renderer.domElement );
    controlTransformM = new THREE.TransformControls( camera, renderer.domElement );
    controlTransformCla = new THREE.TransformControls( camera, renderer.domElement );
    controlTransformAra = new THREE.TransformControls( camera, renderer.domElement );


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
        setAxeZ();
        /**
         *
         * @type {number}
         */
       for (var i = 4 ; i <=9 ; i++) {
            controlTransform.children[0].children[0].children[i].material.transparent = true;
            controlTransform.children[0].children[0].children[i].material.opacity = 0;
        }
        /**
         *
         * @type {number}
         */
        console.log('  it s time to change ');
        console.log(-distanceF4yInitiale + droiteF4.getPlane().position.y);
        var dist = -distanceF4yInitiale + droiteF4.getPlane().position.y;
        droiteF6.getPlane().position.y = distanceF6yInitiale + dist;
        pointDelaire3D.children[4].position.y = odY +dist;

        /**
         * Compute the new F4
         */
        droiteF4.vecteurB.y = odY + dist;
        droiteF4.setVecteurA(droiteF4.drawParallel(droiteF4.getVecteurB(),droiteC1));
        profilDelaire.od.y = odY + dist;

        /**
         * Compute the new F6
         */
       /* droiteF6.getVecteurA().y = enatY + dist;
        droiteF6.setVecteurB(droiteF6.drawParallel(droiteF6.getVecteurA(),droiteC2));*/

        /**
         * Test F6
          */
        scene.remove(droiteF6.plane);
        console.log("droiteF4",droiteF4);
        var enat = droiteF4.getIntersection(droiteF5);
        console.log("enat", enat);
        droiteF6.setVecteurA(enat);
        droiteF6.setVecteurB(droiteF6.drawParallel(enat,droiteC2));
        /**
         * Compute the new F8
         */
        var intersection = droiteF2.getIntersection(droiteF6);
        droiteF8.setVecteurA(intersection);
        droiteF8.setVecteurB(profilDelaire.getCo());
        /**
         * Draw
         */
        scene.remove(droiteF8.plane);
        droiteF6.drawPlane();
        droiteF8.drawPlane();

        
    });
    controlTransformCo.addEventListener( 'change', function () {
        setAxeZ();
        /**
         *
         * @type {number}
         */
        for (var i = 4 ; i <=9 ; i++) {
            controlTransformCo.children[0].children[0].children[i].material.transparent = true;
            controlTransformCo.children[0].children[0].children[i].material.opacity = 0;
        }
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
        setAxeZ();
            console.log(" let's change F5");
        /**
         *
         * @type {number}
         */
        for (var i = 4 ; i <=9 ; i++) {
            controlTransformF5.children[0].children[0].children[i].material.transparent = true;
            controlTransformF5.children[0].children[0].children[i].material.opacity = 0;
        }
        /**
         *
         * @type {number}
         */
            var dist = droiteF5.getPlane().position.x -distanceF5xInitiale ;
            droiteF5.vecteurA.x = npX + dist;
            droiteF5.setVecteurB(droiteF5.drawPerpendicular(profilDelaire.getNp(),droiteC1));
            pointDelaire3D.children[3].position.x = npX + dist;
            /**
             *  Draw
             */
            if(dist!=0){
                scene.remove(droiteF6.plane);
                var enat = droiteF4.getIntersection(droiteF5);
                console.log("enat", enat);
                droiteF6.setVecteurA(enat);
                droiteF6.setVecteurB(droiteF6.drawParallel(enat,droiteC2));
                var intersection = droiteF2.getIntersection(droiteF6);
                droiteF8.setVecteurA(intersection);
                droiteF8.setVecteurB(profilDelaire.getCo());
                scene.remove(droiteF8.plane);
                droiteF6.drawPlane();
                droiteF8.drawPlane();
                controlTransformCo.detach();
                scene.remove(controlTransformCo);
                controlTransformCo.attach(pointDelaire3D.children[7]);
                controlTransformCo.setMode("translate");
                scene.add(controlTransformCo);
            }
    });
    controlTransformPts.addEventListener('change', function () {
        setAxeZ();
        for (var i = 4 ; i <=9 ; i++) {
            controlTransformPts.children[0].children[0].children[i].visible = false;
        }
        profilDelaire.setPts(pointDelaire3D.children[5].position);
        droiteF2.setVecteurA(profilDelaire.getPts());
        scene.remove(droiteF2.plane);
        droiteF2.drawPlane();
        var intersection = droiteF2.getIntersection(droiteF6);
        droiteF8.setVecteurA(intersection);
        scene.remove(droiteF8.plane);
        droiteF8.drawPlane();
    });
    controlTransformPti.addEventListener('change', function () {
        setAxeZ();
        for (var i = 4 ; i <=9 ; i++) {
            controlTransformPti.children[0].children[0].children[i].visible = false;
        }
        profilDelaire.setPti(pointDelaire3D.children[6].position);
        droiteF2.setVecteurB(profilDelaire.getPti());
        scene.remove(droiteF2.plane);
        droiteF2.drawPlane();
        var intersection = droiteF2.getIntersection(droiteF6);
        droiteF8.setVecteurA(intersection);
        scene.remove(droiteF8.plane);
        droiteF8.drawPlane();
    });
   controlTransformM.addEventListener('change', function () {
        setAxeZ();
        for (var i = 4 ; i <=9 ; i++) {
            controlTransformM.children[0].children[0].children[i].visible = false;
        }
        console.log("profilDelaire.getM()",profilDelaire.getM());
        console.log("pointDelaire3D.children.position",pointDelaire3D.children[0].position);

        profilDelaire.setM(pointDelaire3D.children[0].position);
        scene.remove(droiteC1.plane);
        scene.remove(droiteC2.plane);
        scene.remove(droiteF5.plane);
        scene.remove(droiteF4.plane);
        scene.remove(droiteF6.plane);
        scene.remove(droiteF8.plane);

        droiteC1.setVecteurA(profilDelaire.getM());
        droiteC2.setVecteurA(profilDelaire.getM());
        droiteF5.setVecteurB(droiteF5.drawPerpendicular(profilDelaire.getNp(),droiteC1));
        droiteF4.setVecteurB(profilDelaire.getOd());
        odY =  profilDelaire.getOd().y;
        droiteF4.setVecteurA(droiteF4.drawParallel(profilDelaire.getOd(),droiteC1));
        var enat = droiteF4.getIntersection(droiteF5);
        droiteF6.setVecteurA(enat);
        enatY = droiteF6.getVecteurA().y;
        enatX = droiteF6.getVecteurA().x;
        droiteF6.setVecteurB(droiteF6.drawParallel(enat,droiteC2));
        var pto = droiteF2.getIntersection(droiteF6);
        droiteF8.setVecteurA(pto);
        ptoY = droiteF8.getVecteurA().y;
        droiteC1.drawPlane();
        droiteC2.drawPlane();
        droiteF5.drawPlane();
        droiteF4.drawPlane();
        droiteF6.drawPlane();
        droiteF8.drawPlane();
        controlTransform.attach( droiteF4.getPlane() );
        controlTransformF5.attach( droiteF5.getPlane() );
        distanceF6yInitiale = droiteF6.getPlane().position.y;
        distanceF4yInitiale = droiteF4.getPlane().position.y;

    });
    controlTransformCla.addEventListener('change', function () {
        setAxeZ();
        for (var i = 4 ; i <=9 ; i++) {
            controlTransformCla.children[0].children[0].children[i].visible = false;
        }
        console.log("profilDelaire.getM()",profilDelaire.getClp());
        console.log("pointDelaire3D.children.position",pointDelaire3D.children[1].position);

        profilDelaire.setClp(pointDelaire3D.children[1].position);
        scene.remove(droiteC1.plane);
        scene.remove(droiteF5.plane);
        scene.remove(droiteF4.plane);
        scene.remove(droiteF6.plane);
        scene.remove(droiteF8.plane);

        droiteC1.setVecteurB(profilDelaire.getClp());
        droiteF5.setVecteurB(droiteF5.drawPerpendicular(profilDelaire.getNp(),droiteC1));
        droiteF4.setVecteurB(profilDelaire.getOd());
        odY =  profilDelaire.getOd().y;
        droiteF4.setVecteurA(droiteF4.drawParallel(profilDelaire.getOd(),droiteC1));
        var enat = droiteF4.getIntersection(droiteF5);
        droiteF6.setVecteurA(enat);
        enatY = droiteF6.getVecteurA().y;
        enatX = droiteF6.getVecteurA().x;
        droiteF6.setVecteurB(droiteF6.drawParallel(enat,droiteC2));
        var pto = droiteF2.getIntersection(droiteF6);
        droiteF8.setVecteurA(pto);
        ptoY = droiteF8.getVecteurA().y;
        droiteC1.drawPlane();
        droiteF5.drawPlane();
        droiteF4.drawPlane();
        droiteF6.drawPlane();
        droiteF8.drawPlane();
        controlTransform.attach( droiteF4.getPlane() );
        controlTransformF5.attach( droiteF5.getPlane() );
        distanceF6yInitiale = droiteF6.getPlane().position.y;
        distanceF4yInitiale = droiteF4.getPlane().position.y;
    });

    controlTransformAra.addEventListener('change', function () {
        setAxeZ();
        for (var i = 4 ; i <=9 ; i++) {
            controlTransformAra.children[0].children[0].children[i].visible = false;
        }
        console.log("profilDelaire.getM()",profilDelaire.getAra());
        console.log("pointDelaire3D.children.position",pointDelaire3D.children[2].position);

        profilDelaire.setAra(pointDelaire3D.children[2].position);
        scene.remove(droiteC2.plane);
        scene.remove(droiteF6.plane);
        scene.remove(droiteF8.plane);

        droiteC2.setVecteurB(profilDelaire.getAra());
        var enat = droiteF4.getIntersection(droiteF5);
        droiteF6.setVecteurA(enat);
        enatY = droiteF6.getVecteurA().y;
        enatX = droiteF6.getVecteurA().x;
        droiteF6.setVecteurB(droiteF6.drawParallel(enat,droiteC2));
        var pto = droiteF2.getIntersection(droiteF6);
        droiteF8.setVecteurA(pto);
        ptoY = droiteF8.getVecteurA().y;
        droiteC2.drawPlane();
        droiteF6.drawPlane();
        droiteF8.drawPlane();
        distanceF6yInitiale = droiteF6.getPlane().position.y;
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
    event.preventDefault();
    window.onresize = function() {
        scene3D = $('#scene');
        mouse.x = ( (event.clientX -scene3D.offset().left + $(window).scrollLeft() ) / scene3D.width() ) * 2 - 1;
        mouse.y = - ( (event.clientY -scene3D.offset().top +$(window).scrollTop() )/ scene3D.height() ) * 2 + 1;
        console.log("onresize");
    };
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
                npX = profilDelaire.getNp().x;
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
        for (var i = 4 ; i <=9 ; i++) {
            controlTransformF5.children[0].children[0].children[i].visible = false;
        }
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

        for (var k = 4 ; k <= 9 ; k++) {
            controlTransform.children[0].children[0].children[k].visible = false;
            console.log("houssam");
           // controlTransform.children[0].children[0].children[i].material.opacity = 0;

        }
        scene.add( controlTransform );
        /**
         * Point CO
         */
        controlTransformCo.attach( pointDelaire3D.children[7]);
        controlTransformCo.setMode("translate");
        for (var i = 4 ; i <=9 ; i++) {
            controlTransformCo.children[0].children[0].children[i].visible = false;
        }
        scene.add( controlTransformCo );
        /**
         * Point PTS
         */
        controlTransformPts.attach( pointDelaire3D.children[5] );
        controlTransformPts.setMode("translate");
        for (var i = 4 ; i <=9 ; i++) {
            controlTransformPts.children[0].children[0].children[i].visible = false;
        }
        scene.add( controlTransformPts );
        /**
         * Point PTI
         */
        controlTransformPti.attach( pointDelaire3D.children[6] );
        controlTransformPti.setMode("translate");
        for (var i = 4 ; i <=9 ; i++) {
            controlTransformPti.children[0].children[0].children[i].visible = false;
        }
        scene.add( controlTransformPti );
        /**
         * Point M
         * @type {boolean}
         */
        controlTransformM.attach( pointDelaire3D.children[0] );
        controlTransformM.setMode("translate");
        for (var i = 4 ; i <=9 ; i++) {
            controlTransformM.children[0].children[0].children[i].visible = false;
        }
       scene.add( controlTransformM );
        /**
         * Point Cla
         */
        controlTransformCla.attach( pointDelaire3D.children[1] );
        controlTransformCla.setMode("translate");
        for (var i = 4 ; i <=9 ; i++) {
            controlTransformCla.children[0].children[0].children[i].visible = false;
        }
        scene.add( controlTransformCla );
        /**
         * Point Ara
         */
        controlTransformAra.attach( pointDelaire3D.children[2] );
        controlTransformAra.setMode("translate");
        for (var i = 4 ; i <=9 ; i++) {
            controlTransformAra.children[0].children[0].children[i].visible = false;
        }
        scene.add( controlTransformAra );

        /**
         *
         * @type {boolean}
         */
        conditionDelaire = false;
        id("delval").style.display ="none";
        id("validerProfil").style.display ="";
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
function validerProfil() {
    swal({
            title: "êtes vous sûr?",
            text: "Vous ne pouvez plus modifier l'évaluation céphalométrique",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Oui validez !",
            closeOnConfirm: false
        },
        function(){
            swal("Valider !", "Votre évaluation céphalométrique est validée", "success");
            controlTransformCo.detach();
            controlTransform.detach();
            controlTransformF5.detach();
            scene.remove(controlTransformCo);
            scene.remove(controlTransformF5);
            scene.remove(controlTransform);
            scene.remove(controlTransformPti);
            scene.remove(controlTransformPts);
            scene.remove(controlTransformM);
            scene.remove(controlTransformAra);
            scene.remove(controlTransformCla);
            id("validerProfil").style.display = "none";
        });
}
function setAxeZ() {
    for (var i=0; i<8 ; i++){
        pointDelaire3D.children[i].position.z = 0;
    }
    controlTransformCo.position.z = 0;
    controlTransformPts.position.z = 0;
    controlTransformF5.position.z = 0;
    controlTransform.position.z =0;
    controlTransformPti.position.z =0;
    controlTransformM.position.z =0;
    controlTransformCla.position.z = 0;
    controlTransformAra.position.z = 0;
   /* droiteC1.plane.position.z = 0;
    droiteC2.plane.position.z = 0;
    droiteF5.plane.position.z = 0;
    droiteF4.plane.position.z = 0;
    droiteF2.plane.position.z = 0;
    droiteF6.plane.position.z = 0;
    droiteF8.plane.position.z = 0;*/
}
function render() {
    requestAnimationFrame(render);
    renderer.render(scene,camera);
    raycaster.setFromCamera( mouse, camera );
}
init();
render();