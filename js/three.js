window.onload = function() {
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
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

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load('assets/nikeShirt/nikeShirt.mtl', function (materials) {

        materials.preload();

        var objLoader = new THREE.OBJLoader2();
        objLoader.setMaterials(materials);
        objLoader.setPath('assets/nikeShirt');
        objLoader.load('nikeShirt.obj', function (object) {

            scene.add(object);
            object.position.y -= 60;

        });

    });

    const animate = function () {
        requestAnimationFrame( animate );

        renderer.render( scene, camera );
    };

    animate();
}