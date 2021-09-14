window.onload = function() {
    
    const video = document.getElementById("video");

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set(2.5,2.5,2.5);

    const renderer = new THREE.WebGLRenderer( { alpha: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( 1257, 707.06 );
    renderer.setClearColor( 0x000000, 0 );
    scene.background = null;
    document.body.appendChild( renderer.domElement );

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

    camera.position.z = 200;

    var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
    keyLight.position.set(-100, 0, 100);

    var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
    fillLight.position.set(100, 0, 100);

    var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
    backLight.position.set(100, 0, -100).normalize();

    scene.add(keyLight);
    scene.add(fillLight);
    scene.add(backLight);

    /*
    const mtlLoader = new THREE.MTLLoader();
    mtlLoader.load('assets/model/c.mtl', function (materials) {

        materials.preload();

        const objLoader = new THREE.OBJLoader();
        objLoader.load('assets/model/c.obj', function (object) {

            scene.add(object);
            object.position.y -= 60;

        });

    });
    */

    const gltfLoader = new THREE.GLTFLoader();
    gltfLoader.load('assets/model/model.glb', function (gltf) {

        scene.add(gltf.scene);
        gltf.scene.traverse(function(node) {

            if (node instanceof THREE.Mesh) {
              frontObject = node;
              node.geometry.computeFaceNormals();
              node.geometry.computeVertexNormals();
            }
 
        });

        frontObject = gltf.scene;
        console.log("LOADED");
        frontObject.scale.set(1000, 1000, 1000);
    });

    const animate = function () {
        requestAnimationFrame( animate );

        renderer.render( scene, camera );
    };

    animate();
}