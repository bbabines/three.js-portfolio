import * as THREE from "three";

export class RaycastManager {
	constructor(camera, sceneObjects, portalData, onSceneChange) {
		this.camera = camera
		this.mouse = new THREE.Vector2()
		this.raycaster = new THREE.Raycaster()

		
		this.sceneObjects = sceneObjects
		this.portals = portalData
		this.onSceneChange = onSceneChange

		window.addEventListener("mousemove", (event) => this.updateMousePosition(event));
		window.addEventListener("dblclick", (event) => this.handlePortalClick(event));
	}

	updateMousePosition(event) {
		this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
		this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

		this.checkMouseIntersection()
	}

	checkMouseIntersection() {
		this.raycaster.setFromCamera(this.mouse, this.camera)

		const intersects = this.raycaster.intersectObjects(
			Array.isArray(this.sceneObjects) ? this.sceneObjects : [this.sceneObjects],
			true
		);

		if (intersects.length > 0) {
			console.log("Hovered over:", intersects?.[0]?.point);
		}
	}

	handlePortalClick(event) {
		this.updateMousePosition(event)
		this.raycaster.setFromCamera(this.mouse, this.camera)

		console.log(this.portals.back);
		

		const leftIntersects = this.portals.left
			? this.raycaster.intersectObject(this.portals.left, true)
			: [];

		const rightIntersects = this.portals.right
			? this.raycaster.intersectObject(this.portals.right, true)
			: [];

		// const backIntersects = this.portals.back
		// 	? this.raycaster.intersectObject(this.portals.back, true)
		// 	: [];

		// @TODO - add logic to get back to mainScene
		if (leftIntersects.length > 0) {
			this.onSceneChange?.("sceneTwo");
		} else if (rightIntersects.length > 0) {
			this.onSceneChange?.("sceneThree");
		} 
		
		// else if (backIntersects.length > 0) {
		// 	this.onSceneChange?.("mainScene");
		// }

		return null;

	}

	// showTooltip(event, object) {}

	// hideTooltip() {}

	// applyOutline(object) {}

	// removeOutline() {}

	
}
