import * as THREE from "three";

export class RaycastManager {
	constructor(camera, sceneObjects, portalData) {
		this.camera = camera
		this.mouse = new THREE.Vector2()
		this.raycaster = new THREE.Raycaster()

		
		this.sceneObjects = sceneObjects
		this.portals = portalData

		window.addEventListener("mousemove", (event) => this.updateMousePosition(event));
		window.addEventListener("click", (event) => this.handleClick(event));
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

	// handleClick(event) {}

	// showTooltip(event, object) {}

	// hideTooltip() {}

	// applyOutline(object) {}

	// removeOutline() {}

	
}
