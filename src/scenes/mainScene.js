import * as THREE from "three";
import { BaseScene } from "./baseScene";
import { ModelLoader } from "../utils/modelLoader";

export class MainScene extends BaseScene {
	constructor(portalEffect) {
		super();
		this.portals = { left: null, right: null };
		this.modelLoader = new ModelLoader();

		this.portalEffect = portalEffect;
		this.initPortalMaterials();
		this.loadPortals();

		this.addSquares();

		this.setupLights();
		this.setupFloor();
		this.instanceGrass();

		this.raycaster = new THREE.Raycaster();
		this.mouse = new THREE.Vector2();
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
			console.error("❌ portalEffect is undefined!");
			return;
		}

		const materials = this.portalEffect.getMaterials();
		if (!materials.materialOne || !materials.materialTwo) {
			console.error("❌ Portal materials are missing!", materials);
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

			// Pre-calculate random values for better performance

			// Define spread area

			// Batch process instances for better performance

			// process instance

			// Vary scale within reasonable bounds

			// Reduced variation

			// set neeedsUpdate on instance

			// Process next batch in next frame

			// Start processing instances

			// Add frustum culling

			// Optional: Add LOD (Level of Detail)
			// Full detail

			// add load
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

		if (leftIntersects.length > 0) {
			return "sceneTwo";
		} else if (rightIntersects.length > 0) {
			return "sceneThree";
		}

		return null;
	}

	update(elapsedTime) {
		// @TODO
	}
}
