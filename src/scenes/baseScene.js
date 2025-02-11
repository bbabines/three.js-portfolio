import * as THREE from "three";
import { ModelLoader } from "../utils/modelLoader";

export class BaseScene extends THREE.Scene {
	constructor() {
		super();
		this.initilize();
	}

	initilize() {
		this.raycaster = new THREE.Raycaster();
		this.mouse = new THREE.Vector2();
	}

	handleClick(event, camera) {
		this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
		this.raycaster.setFromCamera(this.mouse, camera);
	}

	update(elapsedTime) {
		// @TODO
	}
}
