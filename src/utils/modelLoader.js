import { DRACOLoader, GLTFLoader } from "three/examples/jsm/Addons.js";

export class ModelLoader {
	constructor() {
		this.loader = new GLTFLoader();
		this.setupDraco();
	}

	setupDraco() {
		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
		this.loader.setDRACOLoader(dracoLoader);
	}

	load(url, onLoad) {
		// Remove any leading slash
		const cleanPath = url.startsWith("/") ? url.slice(1) : url;

		return this.loader.load(
			cleanPath,
			(gltf) => {
				// console.log("Model loaded:", gltf);
				onLoad(gltf.scene);
			},
			(xhr) => {
				console.log(`Loading progress: ${(xhr.loaded / xhr.total) * 100}%`);
			},
			(error) => {
				console.error("Error loading GLB:", error);
			}
		);
	}
}
