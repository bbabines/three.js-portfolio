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

			if (!grass || !grass.geometry || !grass.material) {
				console.error("Grass model does not contain geometry");
				return;
			}

			// Clone and potentially optimize the geometry
			const geometry = grass.geometry.clone();
			geometry.computeBoundingBox();
			geometry.computeBoundingSphere();

			// Clone and modify material for better performance
			const material = grass.material.clone();
			material.side = THREE.DoubleSide;
			material.transparent = false; // Disable if not needed
			material.flatShading = true; // Enable for better performance

			// Increase instance count
			const instanceCount = 100000; // Can handle much larger numbers now
			const instancedGrass = new THREE.InstancedMesh(
				geometry,
				material,
				instanceCount
			);

			// Pre-calculate random values for better performance
			const copiedGrass = new THREE.Object3D();
			const matrix = new THREE.Matrix4();

			// Define spread area
			const spreadX = 10; // Increase area to spread instances
			const spreadZ = 10;

			// Batch process instances for better performance
			const batchSize = 1000;
			let currentInstance = 0;

			const processInstances = () => {
				const endIdx = Math.min(currentInstance + batchSize, instanceCount);

				for (let i = currentInstance; i < endIdx; i++) {
					copiedGrass.position.set(
						Math.random() * spreadX - spreadX / 2,
						0,
						Math.random() * spreadZ - spreadZ / 2
					);

					copiedGrass.rotation.y = Math.random() * Math.PI;

					// Vary scale within reasonable bounds
					const scale = 2.8 + Math.random() * 5; // Reduced variation
					copiedGrass.scale.set(scale, scale, scale);

					copiedGrass.updateMatrix();
					instancedGrass.setMatrixAt(i, copiedGrass.matrix);
				}

				instancedGrass.instanceMatrix.needsUpdate = true;
				currentInstance = endIdx;

				if (currentInstance < instanceCount) {
					// Process next batch in next frame
					requestAnimationFrame(processInstances);
				}
			};

			// Start processing instances
			processInstances();

			// Add frustum culling
			instancedGrass.frustumCulled = true;

			// Optional: Add LOD (Level of Detail)
			const lod = new THREE.LOD();
			lod.addLevel(instancedGrass, 0); // Full detail

			this.add(lod);
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
