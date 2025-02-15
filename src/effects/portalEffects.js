import * as THREE from "three";

export class PortalEffect {
	constructor(renderer, camera) {
		this.renderer = renderer;
		this.camera = camera;

		this.portalMaterial = new THREE.ShaderMaterial({
			uniforms: {
				tBackground: { value: null },
			},
			vertexShader: `
                varying vec2 vUv;
                
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
			fragmentShader: `
                uniform sampler2D tBackground;
                varying vec2 vUv;
                
                void main() {
                    vec4 color = texture2D(tBackground, vUv);
                    gl_FragColor = color;
                }
            `,
			side: THREE.DoubleSide,
			transparent: true,
		});
	}

	setBackgroundTexture(texture) {
		this.portalMaterial.uniforms.tBackground.value = texture;
	}

	update() {
		// @TODO if we need an animation to the shader
	}

	getMaterial() {
		return this.portalMaterial;
	}
}
