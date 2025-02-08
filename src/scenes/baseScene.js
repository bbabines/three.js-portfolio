import * as THREE from "three";
import { ModelLoader } from "../utils/modelLoader";

export class BaseScene extends THREE.Scene {
	constructor() {
		super();
		this.initilize();
	}

	initilize() {
		// Common scene setup logic
		this.loadingManager = new THREE.LoadingManager();
		this.textureLoader = new THREE.TextureLoader(this.loadingManager);
		this.modelLoader = new ModelLoader();
	}

	update(elapsedTime) {
		// @TODO
	}
}
