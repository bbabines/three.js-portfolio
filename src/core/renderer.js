import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export class Renderer {
	constructor(canvas) {
		this.canvas = canvas;
		this.sizes = {
			width: window.innerWidth,
			height: window.innerHeight,
		};

		this.setupRenderer();
		this.setupCamera();
		this.setupControls();
		this.setupEventListeners();
	}

	setupRenderer() {
		// const renderer = new THREE.WebGLRenderer({
		// 	canvas: canvas,
		// });

		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas,
		});

		this.updateRenderSize();
	}

	setupCamera() {
		// const camera = new THREE.PerspectiveCamera(
		// 75,
		// sizes.width / sizes.height,
		// 0.1,
		// 100
		// );
		this.camera = new THREE.PerspectiveCamera(
			75,
			this.sizes.width / this.sizes.height,
			0.1,
			100
		);

		// camera.position.x = 1;
		// camera.position.y = 1;
		// camera.position.z = 2;
		this.camera.position.set(1, 1, 2);
	}

	setupControls() {
		const controls = new OrbitControls(this.camera, this.canvas);
		controls.enableDamping = true;
	}

	setupEventListeners() {
		// window.addEventListener("resize", () => {
		// 	// Update sizes
		// 	sizes.width = window.innerWidth;
		// 	sizes.height = window.innerHeight;
		// 	``;

		window.addEventListener("resize", () => {
			this.sizes.width = window.innerWidth;
			this.sizes.height = window.innerHeight;

			this.updateRenderSize();
			this.updateCamera();
		});
	}

	updateRenderSize() {
		// renderer.setSize(sizes.width, sizes.height);
		// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		this.renderer.setSize(this.sizes.width, this.sizes.height);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	}

	updateCamera() {
		// camera.aspect = sizes.width / sizes.height;
		// ``;
		// camera.updateProjectionMatrix();
		this.camera.aspect = this.sizes.width / this.sizes.height;
		this.camera.updateProjectionMatrix();
	}

	update() {
		// 	controls.update();
		this.controls?.update();
	}

	render(scene) {
		// 	renderer.render(sceneOne, camera);
		this.renderer.render(scene, this.camera);
	}
}
