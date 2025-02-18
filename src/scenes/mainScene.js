import * as THREE from "three";
import { BaseScene } from "./baseScene";
import { ModelLoader } from "../utils/modelLoader";
import { RaycastManager } from "../utils/raycastManager";

export class MainScene extends BaseScene {
	constructor(portalEffect, renderer, onSceneChange) {
		super();
		this.camera = renderer.camera
		this.objectsToRaycast = []

		this.portals = { right: null, back: null, left: null };
		this.modelLoader = new ModelLoader();

		this.portalEffect = portalEffect;
		this.initPortalMaterials();
		this.loadPortals();

		this.addSquares();

		this.setupLights();
		this.setupFloor();
		// @TODO - get grass working again
		// this.instanceGrass();

		this.raycastManager = new RaycastManager(this.camera, this.objectsToRaycast, this.portals, onSceneChange)
	}

	addSquares() {
		const box1 = new THREE.BoxGeometry();
		const material1 = new THREE.MeshBasicMaterial({
			color: "pink",
		});

		const box2 = new THREE.BoxGeometry();
		const material2 = new THREE.MeshBasicMaterial({
			color: "blue",
		});

		const mesh1 = new THREE.Mesh(box1, material1);
		const mesh2 = new THREE.Mesh(box2, material2);
		mesh1.position.set(-3, 0.5, 2);
		mesh2.position.set(3, 0.5, 2);
		this.add(mesh1);
		this.add(mesh2);
	}

	initPortalMaterials() {
		if (!this.portalEffect) {
			console.error("portalEffect is undefined!");
			return;
		}

		const materials = this.portalEffect.getMaterials();
		if (!materials.materialOne || !materials.materialTwo) {
			console.error("Portal materials are missing!", materials);
			return;
		}

		this.portalMaterials = {
			materialOne: materials.materialOne,
			materialTwo: materials.materialTwo,
		};
	}

	setupLights() {
		const ambientLight = new THREE.AmbientLight(0xffffff, 1);
		this.add(ambientLight);
	}

	instanceGrass() {
		this.modelLoader.load("/models/grass.glb", (model) => {
			const grass = model.children[0];

			// Clone and potentially optimize the geometry
			const geometry = grass.geometry.clone();

			// Clone
			const material = grass.material.clone();
			material.side = THREE.DoubleSide;

			// modify material for better performance
			material.transparent = false;
			material.flatShading = true;

			const instanceCount = 1000;
			const instancedGrass = new THREE.InstancedMesh(
				geometry,
				material,
				instanceCount
			);

			this.add(instancedGrass);
		});
	}

	setupFloor() {
		const gridHelper = new THREE.GridHelper(100, 100, "purple", "purple");
		this.add(gridHelper);

		// const geometry = new THREE.PlaneGeometry(15, 15);
		// const material = new THREE.MeshBasicMaterial({
		// 	side: THREE.DoubleSide,
		// 	color: "white",
		// });
		// const floor = new THREE.Mesh(geometry, material);
		// floor.rotation.x = Math.PI / 2;
		// this.add(floor);
	}

	loadPortals() {
		const portalData = [
			{
				position: new THREE.Vector3(-4, 0, 0),
				key: "left",
				material: this.portalMaterials.materialOne,
			},
			{
				position: new THREE.Vector3(4, 0, 0),
				key: "right",
				material: this.portalMaterials.materialTwo,
			},
		];

		portalData.forEach(({ position, key, material }) => {
			this.modelLoader.load("models/newPortal.glb", (model) => {
				model.position.copy(position);

				// Find the portal frame/surface mesh in the loaded model
				model.traverse((child) => {
					if (child.isMesh) {
						child.material = material;
					}
				});

				this.portals[key] = model;
				model.name = `${key} portal`
				this.add(model);
			});
		});
	}

	update(elapsedTime) {
		// @TODO
	}
}
