import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();

const meshLoader = new GLTFLoader();
meshLoader.load(
	"../static/models/portal.glb", // Add the path
	(gltf) => {
		console.log("Model loaded:", gltf);
		scene.add(gltf.scene);
	},
	(xhr) => {
		// xhr (XMLHttpRequest) is an object that provi`des information about the progress of the file being loaded.
		console.log(`Loading progress: ${(xhr.loaded / xhr.total) * 100}%`);
	},
	(error) => {
		console.error("Error loading GLB:", error);
	}
);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("./textures/land.png");

const geometry = new THREE.PlaneGeometry(5, 5);
const material = new THREE.MeshBasicMaterial({
	map: texture,
	side: THREE.DoubleSide,
});
const floor = new THREE.Mesh(geometry, material);
scene.add(floor);

floor.rotation.x = Math.PI / 2;

const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

window.addEventListener("resize", () => {
	// Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;
	``;

	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	0.1,
	100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();

const animate = () => {
	const elapsedTime = clock.getElapsedTime();

	// Update controls
	controls.update();

	renderer.render(scene, camera);

	window.requestAnimationFrame(animate);
};

animate();
