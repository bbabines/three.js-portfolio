import * as THREE from "three";
import { BaseScene } from "./baseScene";
import { ModelLoader } from "../utils/modelLoader";

export class SceneThree extends BaseScene {
	constructor() {
		super();
		this.portals = { left: null, right: null };
		this.modelLoader = new ModelLoader();
		this.setupLights();
		this.setupFloor();
		this.loadPortals();

		this.raycaster = new THREE.Raycaster();
		this.mouse = new THREE.Vector2();
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
			{ position: new THREE.Vector3(-4, 0, 0), key: "left" },
			{ position: new THREE.Vector3(4, 0, 0), key: "right" },
			{ position: new THREE.Vector3(0, 0, -2), key: "back" },
		];

		portalData.forEach(({ position, key }) => {
			this.modelLoader.load("models/portal.glb", (model) => {
				model.position.copy(position);
				this.portals[key] = model;
				this.add(model);
			});
		});
	}

	// Call this from app.js
	// @TODO - use base scene logic somehow
	handlePortalClick(event, camera) {
		this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

		this.raycaster.setFromCamera(this.mouse, camera);

		const leftIntersects = this.portals.left
			? this.raycaster.intersectObject(this.portals.left, true)
			: [];

		const rightIntersects = this.portals.right
			? this.raycaster.intersectObject(this.portals.right, true)
			: [];

		const backIntersects = this.portals.back
			? this.raycaster.intersectObject(this.portals.back, true)
			: [];

		if (leftIntersects.length > 0) {
			return "sceneTwo";
		} else if (rightIntersects.length > 0) {
			return "sceneThree";
		} else if (backIntersects.length > 0) {
			return "main";
		}

		return null;
	}

	update(elapsedTime) {
		// @TODO
	}
}
