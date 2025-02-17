import * as THREE from "three";

export class PortalEffect {
	constructor(renderer, camera) {
		this.renderer = renderer;
		this.mainCamera = camera;

		// Create two render targets
		this.renderTargetOne = new THREE.WebGLRenderTarget(
			window.innerWidth,
			window.innerHeight,
			{
				minFilter: THREE.LinearFilter,
				magFilter: THREE.LinearFilter,
				format: THREE.RGBAFormat,
			}
		);

		this.renderTargetTwo = new THREE.WebGLRenderTarget(
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

		// Create two portal materials for different portal views
		this.portalMaterialOne = new THREE.ShaderMaterial({
			uniforms: {
				tPortal: { value: this.renderTargetOne.texture },
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

            // Center the UV coordinates
            vec2 centeredUV = vUv - 0.5;
            float dist = length(centeredUV);

            // Discard pixels outside the circle
            if (dist > 0.5) discard;

            gl_FragColor = color;
        }
    `,
			transparent: true, // Ensure transparency works
			side: THREE.DoubleSide,
		});

		this.portalMaterialTwo = new THREE.ShaderMaterial({
			uniforms: {
				tPortal: { value: this.renderTargetTwo.texture },
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

            // Center the UV coordinates
            vec2 centeredUV = vUv - 0.5;
            float dist = length(centeredUV);

            // Discard pixels outside the circle
            if (dist > 0.5) discard;

            gl_FragColor = color;
        }
    `,
			transparent: true, // Ensure transparency works
			side: THREE.DoubleSide,
		});

		// Handle window resize
		window.addEventListener("resize", () => {
			this.renderTargetOne.setSize(window.innerWidth, window.innerHeight);
			this.renderTargetTwo.setSize(window.innerWidth, window.innerHeight);
		});
	}

	getMaterials() {
		return {
			materialOne: this.portalMaterialOne,
			materialTwo: this.portalMaterialTwo,
		};
	}

	updateCamera() {
		// Sync the portal camera's position with the main camera's position
		this.portalCamera.position.copy(this.mainCamera.position);
		this.portalCamera.rotation.copy(this.mainCamera.rotation);
	}

	// Render the two portal scenes separately
	render(portalSceneOne, portalSceneTwo) {
		if (!portalSceneOne || !portalSceneTwo) return;

		// Update portal camera
		this.updateCamera();

		// Store current renderer state
		const currentRenderTarget = this.renderer.getRenderTarget();

		// Render first portal scene
		this.renderer.setRenderTarget(this.renderTargetOne);
		this.renderer.clear();
		this.renderer.render(portalSceneOne, this.portalCamera);

		// Render second portal scene
		this.renderer.setRenderTarget(this.renderTargetTwo);
		this.renderer.clear();
		this.renderer.render(portalSceneTwo, this.portalCamera);

		// Restore previous render target
		this.renderer.setRenderTarget(currentRenderTarget);
	}
}
