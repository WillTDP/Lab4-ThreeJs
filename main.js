import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { BackSide } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

			const renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

      //add orbit controls
      const controls = new OrbitControls(camera, renderer.domElement);
      //controls.enableDamping = true;

			//add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight)
      //add directional light
      const directionalLight = new THREE.DirectionalLight(0xf5ffff, 5.5);
      directionalLight.position.x = 2;
      directionalLight.position.z = 1;
      directionalLight.position.y = -5;
      scene.add(directionalLight)
      //add directionalLight helper
      const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 2);
      scene.add(directionalLightHelper)

      //add sphere
      //load texture
      const textureLoader = new THREE.TextureLoader();
      const SPACETexture = textureLoader.load('/textures/galaxy.webp');
      const spheregeometry = new THREE.SphereGeometry( 150, 32, 32 );
      const spherematerial = new THREE.MeshLambertMaterial( { color: 0x00fff0 } );
      spherematerial.map = SPACETexture;
      spherematerial.side = BackSide;
      const sphere = new THREE.Mesh( spheregeometry, spherematerial );
      scene.add( sphere );

      const geometry = new THREE.BoxGeometry( 1, 1, 1 );
			const material = new THREE.MeshLambertMaterial( { color: 0x00fff0 } );
      const cube = new THREE.Mesh( geometry, material );
			scene.add( cube );


			camera.position.z = 5;
      
    /*  //load gltf model
      let robot;
      const gltfLoader = new GLTFLoader();
      gltfLoader.load('/models/robot/scene.gltf', (gltf) => {
        robot = gltf.scene;
        scene.add(gltf.scene);
        //loop over meshes
        gltf.scene.traverse((child) => {
          if(child.isMesh){
            //change material colour
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
      });*/


			function animate() {
				requestAnimationFrame( animate );

       /* cube.rotation.x += 0.01;
				cube.rotation.y += 0.05;*/


        controls.update();
        
				renderer.render( scene, camera );
			};

			animate();

      document.querySelector(".recolor").addEventListener("click", () => {
        //loop over meshes
        robot.traverse((child) => {
          if(child.isMesh){
            //change material colour
            child.material.color.set(0x00ff00);
          }
        });
      });
