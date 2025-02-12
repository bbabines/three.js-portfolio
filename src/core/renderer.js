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

	get info() {
		return this.renderer.info;
	}

	setupRenderer() {
		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas,
		});

		this.updateRenderSize();
	}

	setupCamera() {
		this.camera = new THREE.PerspectiveCamera(
			75,
			this.sizes.width / this.sizes.height,
			0.1,
			100
		);

		this.camera.position.set(1, 1, 2);
	}

	setupControls() {
		const controls = new OrbitControls(this.camera, this.canvas);
		controls.enableDamping = true;
	}

	setupEventListeners() {
		window.addEventListener("resize", () => {
			this.sizes.width = window.innerWidth;
			this.sizes.height = window.innerHeight;

			this.updateRenderSize();
			this.updateCamera();
		});
	}

	updateRenderSize() {
		this.renderer.setSize(this.sizes.width, this.sizes.height);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	}

	updateCamera() {
		this.camera.aspect = this.sizes.width / this.sizes.height;
		this.camera.updateProjectionMatrix();
	}

	update() {
		this.controls?.update();
	}

	render(scene) {
		this.renderer.render(scene, this.camera);
	}
}
