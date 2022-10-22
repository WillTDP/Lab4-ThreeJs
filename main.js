import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { BackSide } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
      
			camera.position.z = 10;
      camera.position.y = 10;
      camera.position.x = -50;
      camera.rotation.y = 50;
 

			const renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

      //add orbit controls
      const controls = new OrbitControls(camera, renderer.domElement);
      //controls.enableDamping = true;

			//add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); 
      scene.add(ambientLight)
      //add Spot light
      const spotLight = new THREE.SpotLight(0xcfeaff, 50 , 300, 1, 1, 2);
      spotLight.position.x = 270;
      spotLight.position.z = 60;
      spotLight.position.y = 95;

      scene.add(spotLight)
      //add spotLight helper
      const spotLightHelper = new THREE.SpotLightHelper(spotLight, 2);
      scene.add(spotLightHelper)

      //add Space Point light
      const SpacespotLight = new THREE.PointLight(0xfffff, 5, 200 , 2);
      SpacespotLight.position.x = 275;
      SpacespotLight.position.z = 60;
      SpacespotLight.position.y = 95;
      scene.add(SpacespotLight)
      //shadow stuff
      SpacespotLight.shadow.mapSize.width = 512; // default
      SpacespotLight.shadow.mapSize.height = 512; // default
      SpacespotLight.shadow.camera.near = 0.5; // default
      SpacespotLight.shadow.camera.far = 500; // default
      //add spotLight helper
      const SpacespotLightHelper = new THREE.PointLightHelper(SpacespotLight, 2);
      scene.add(SpacespotLightHelper)


            //add yellow Point light
            const yellowspotLight = new THREE.PointLight(0xffd966, 5, 10, 2);
            yellowspotLight.position.x = 16;
            yellowspotLight.position.z = 16;
            yellowspotLight.position.y = 8;
            yellowspotLight.castShadow = true; // default false
            scene.add(yellowspotLight)
            //shadow stuff
            yellowspotLight.shadow.mapSize.width = 512; // default
            yellowspotLight.shadow.mapSize.height = 512; // default
            yellowspotLight.shadow.camera.near = 0.5; // default
            yellowspotLight.shadow.camera.far = 500; // default
            //add spotLight helper
            const yellowspotLightHelper = new THREE.PointLightHelper(yellowspotLight, 2);
            scene.add(yellowspotLightHelper)



      
      //add sphere
      //load texture
      const textureLoader = new THREE.TextureLoader();
      const SPACETexture = textureLoader.load('/textures/galaxy.png');
      const spheregeometry = new THREE.SphereGeometry( 300, 64, 64 );
      const spherematerial = new THREE.MeshLambertMaterial( { color: 0x00fff0 } );
      spherematerial.map = SPACETexture;
      spherematerial.side = BackSide;
      const sphere = new THREE.Mesh( spheregeometry, spherematerial );
      scene.add( sphere );

      //add floor
      const geometry = new THREE.BoxGeometry( 80, 1, 80);
      const FloorTexture = textureLoader.load('/textures/stone.jpg');
			const cubematerial = new THREE.MeshLambertMaterial( { color: 0x00fff0 } );
      const cube = new THREE.Mesh( geometry, cubematerial );
      cubematerial.map = FloorTexture;
      cube.receiveShadow = true;
			scene.add( cube );

      //add wall 1
      const wall1geometry = new THREE.BoxGeometry( 1, 10, 20);
      const wall1material = new THREE.MeshLambertMaterial( { color: 0x00fff0 } );
      const wall1 = new THREE.Mesh( wall1geometry, wall1material );
      let wallTexture = textureLoader.load('/textures/woodenplanks.jpg');
      wall1material.map = wallTexture;
      wall1.position.x = -38;
      wall1.position.y = 5;
      wall1.position.z = -20;
      wall1.receiveShadow = true;
      scene.add( wall1 );

      //add wall 2
      const wall2geometry = new THREE.BoxGeometry( 1, 10, 20);
      const wall2material = new THREE.MeshLambertMaterial( { color: 0x00fff0 } );
      const wall2 = new THREE.Mesh( wall2geometry, wall2material );
      wall2material.map = wallTexture;
      wall2.position.x = -28;
      wall2.position.y = 5;
      wall2.position.z = -20;
      wall2.receiveShadow = true;
      scene.add( wall2 );

      //add wall 3 rotated 90 degrees
      const wall3geometry = new THREE.BoxGeometry( 1, 10, 10);
      const wall3material = new THREE.MeshLambertMaterial( { color: 0x00fff0 } );
      const wall3 = new THREE.Mesh( wall3geometry, wall3material );
      wall3material.map = wallTexture;
      wall3.position.x = -33;
      wall3.position.y = 5;
      wall3.position.z = -30;
      wall3.rotation.y = 1.5708;
      wall3.receiveShadow = true;
      scene.add( wall3 );
      //add roof
      const roofgeometry = new THREE.BoxGeometry( 15, 1, 20);
      const roofmaterial = new THREE.MeshLambertMaterial( { color: 0x00fff0 } );
      const roof = new THREE.Mesh( roofgeometry, roofmaterial );
      let roofTexture = textureLoader.load('/textures/rooftiles.jpg');
      roofmaterial.map = roofTexture;
      roof.position.x = -33;
      roof.position.y = 10.5;
      roof.position.z = -20;
      roof.receiveShadow = true;
      scene.add( roof );
      
    //load gltf model
      let BlueBox;
      const gltfLoader = new GLTFLoader();
      gltfLoader.load('/models/BlueBox/BlueBox.glb', (gltf) => {
        BlueBox = gltf.scene; 
        scene.add(gltf.scene);
        //loop over meshes
        gltf.scene.traverse((child) => {
          if(child.isMesh){
            //change material colour
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        //posistion BlueBox
        BlueBox.position.y = 4;
        BlueBox.position.z = 16;
        BlueBox.position.x = 16;
        BlueBox.scale.set(0.5, 0.5, 0.5);
      });
   


			function animate() {
				requestAnimationFrame( animate );

        BlueBox.rotation.y += 0.01;
        

        controls.update();
        
				renderer.render( scene, camera );
			};

			animate();
