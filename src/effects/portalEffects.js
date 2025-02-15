import * as THREE from "three";

export class PortalEffect {
	constructor(renderer, camera) {
		this.renderer = renderer;
		this.mainCamera = camera;

		// Create a render target
		this.renderTarget = new THREE.WebGLRenderTarget(
			window.innerWidth,
			window.innerHeight,
			{
				minFilter: THREE.LinearFilter,
				magFilter: THREE.LinearFilter,
				format: THREE.RGBAFormat,
			}
		);

		// Create a portal camera that will match main camera position
		this.portalCamera = this.mainCamera.clone();

		// Create portal material
		this.portalMaterial = new THREE.ShaderMaterial({
			uniforms: {
				tPortal: { value: this.renderTarget.texture },
			},
			vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
			fragmentShader: `
            uniform sampler2D tPortal;
            varying vec2 vUv;
            void main() {
                vec4 color = texture2D(tPortal, vUv);
                gl_FragColor = color;
            }
        `,
			side: THREE.DoubleSide,
		});

		// Check if portalMaterial is correctly initialized
		if (!this.portalMaterial) {
			console.error("Portal material failed to initialize");
		}

		// Handle window resize
		window.addEventListener("resize", () => {
			this.renderTarget.setSize(window.innerWidth, window.innerHeight);
		});
	}

	getMaterial() {
		return this.portalMaterial;
	}

	updateCamera() {
		// Sync the portal camera's position with the main camera's position
		this.portalCamera.position.copy(this.mainCamera.position);

		// Update the portal camera to always face the same direction relative to the portal view
		this.portalCamera.rotation.copy(this.mainCamera.rotation);
	}

	// Render the portal scene
	render(portalScene) {
		if (!portalScene) return;

		// Update portal camera
		this.updateCamera();

		// Store current renderer state
		const currentRenderTarget = this.renderer.getRenderTarget();

		// Clear the render target before rendering
		this.renderer.setRenderTarget(this.renderTarget);
		// Clear previous contents of the render target
		this.renderer.clear();

		// Render portal scene to our render target
		this.renderer.render(portalScene, this.portalCamera);

		// Restore previous render target
		this.renderer.setRenderTarget(currentRenderTarget);
	}
}
