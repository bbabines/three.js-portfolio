// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { DRACOLoader } from "three/examples/jsm/Addons.js";

// const canvas = document.querySelector("canvas.webgl");
// const sceneOne = new THREE.Scene();

// const sceneTwo = new THREE.Scene();
// const floorTwo = new THREE.Mesh(
// 	new THREE.PlaneGeometry(10, 10),
// 	new THREE.MeshStandardMaterial({ color: 0x2a2a2a })
// );
// floorTwo.rotation.x = -Math.PI / 2;
// sceneTwo.add(floorTwo);

// const sceneThree = new THREE.Scene();
// const floorThree = new THREE.Mesh(
// 	new THREE.PlaneGeometry(7, 7),
// 	new THREE.MeshStandardMaterial({ color: 0x2a2a2a })
// );
// floorThree.rotation.x = -Math.PI / 2;
// sceneThree.add(floorThree);

// const meshLoader = new GLTFLoader();
// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");

// meshLoader.setDRACOLoader(dracoLoader);

// let portalOne;
// let portalTwo;

// meshLoader.load(
// 	"./models/portal.glb",
// 	(gltf) => {
// 		console.log("Model loaded:", gltf);
// 		portalOne = gltf.scene;
// 		sceneOne.add(portalOne);

// 		// @TODO - make the scene in blender and don't move it in code
// 		if (portalOne) {
// 			portalOne.position.set(-2, 0, 0);
// 		}
// 	},
// 	(xhr) => {
// 		// xhr (XMLHttpRequest) is an object that provi`des information about the progress of the file being loaded.
// 		console.log(`Loading progress: ${(xhr.loaded / xhr.total) * 100}%`);
// 	},
// 	(error) => {
// 		console.error("Error loading GLB:", error);
// 	}
// );

// meshLoader.load(
// 	"./models/portal.glb",
// 	(gltf) => {
// 		console.log("Model loaded:", gltf);
// 		portalTwo = gltf.scene;
// 		sceneOne.add(portalTwo);

// 		// @TODO - make the scene in blender and don't move it in code
// 		if (portalTwo) {
// 			portalTwo.position.set(2, 0, 0);
// 		}
// 	},
// 	(xhr) => {
// 		// xhr (XMLHttpRequest) is an object that provides information about the progress of the file being loaded.
// 		console.log(`Loading progress: ${(xhr.loaded / xhr.total) * 100}%`);
// 	},
// 	(error) => {
// 		console.error("Error loading GLB:", error);
// 	}
// );

// const textureLoader = new THREE.TextureLoader();
// const texture = textureLoader.load("./textures/land.png");

// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// sceneOne.add(ambientLight);

// const geometry = new THREE.PlaneGeometry(15, 15);
// const material = new THREE.MeshBasicMaterial({
// 	map: texture,
// 	side: THREE.DoubleSide,
// });
// const floor = new THREE.Mesh(geometry, material);
// sceneOne.add(floor);

// floor.rotation.x = Math.PI / 2;

// const sizes = {
// 	width: window.innerWidth,
// 	height: window.innerHeight,
// };

// window.addEventListener("resize", () => {
// 	// Update sizes
// 	sizes.width = window.innerWidth;
// 	sizes.height = window.innerHeight;
// 	``;

// 	// Update camera
// 	camera.aspect = sizes.width / sizes.height;
// 	``;
// 	camera.updateProjectionMatrix();

// 	// Update renderer
// 	renderer.setSize(sizes.width, sizes.height);
// 	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// });

// const camera = new THREE.PerspectiveCamera(
// 	75,
// 	sizes.width / sizes.height,
// 	0.1,
// 	100
// );
// camera.position.x = 1;
// camera.position.y = 1;
// camera.position.z = 2;
// sceneOne.add(camera);

// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

// const renderer = new THREE.WebGLRenderer({
// 	canvas: canvas,
// });
// renderer.setSize(sizes.width, sizes.height);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// const clock = new THREE.Clock();

// const animate = () => {
// 	const elapsedTime = clock.getElapsedTime();

// 	// Update controls
// 	controls.update();

// 	renderer.render(sceneOne, camera);

// 	window.requestAnimationFrame(animate);
// };

// animate();

import { App } from "./core/app";

const canvas = document.querySelector("canvas.webgl");
const app = new App(canvas);
