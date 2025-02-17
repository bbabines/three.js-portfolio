import * as THREE from "three";
import { BaseScene } from "./baseScene";
import { ModelLoader } from "../utils/modelLoader";
import { RaycastManager } from "../utils/raycastManager";

export class SceneThree extends BaseScene {
	constructor(portalEffect, renderer, onSceneChange) {
			super();
			this.camera = renderer.camera
			this.objectsToRaycast = []
	
			this.portals = { left: null, right: null };
			this.modelLoader = new ModelLoader();
	
			// this.portalEffect = portalEffect;
			// this.initPortalMaterials();
			this.loadPortals();
	
			this.setupLights();
			this.setupFloor();
	
			this.raycastManager = new RaycastManager(this.camera, this.objectsToRaycast, this.portals, onSceneChange)
		}

	setupLights() {
		const ambientLight = new THREE.AmbientLight(0xffffff, 1);
		this.add(ambientLight);
	}

	setupFloor() {
		const gridHelper = new THREE.GridHelper(100, 100, "green", "green");
		this.add(gridHelper);

		// const geometry = new THREE.PlaneGeometry(15, 15);
		// const material = new THREE.MeshBasicMaterial({
		// 	color: "green",
		// 	side: THREE.DoubleSide,
		// });
		// const floor = new THREE.Mesh(geometry, material);
		// floor.rotation.x = Math.PI / 2;
		// this.add(floor);
	}

	loadPortals() {
		const portalData = [
			{ position: new THREE.Vector3(-4, 0, -3), key: "left" },
			{ position: new THREE.Vector3(0, 0, -3), key: "back" },
		];

		portalData.forEach(({ position, key }) => {
			this.modelLoader.load("models/portal.glb", (model) => {
				model.position.copy(position);
				this.portals[key] = model;
				this.add(model);
			});
		});
	}

	update(elapsedTime) {
		// @TODO
	}
}
