import * as THREE from 'three'
import { MainScene } from "../scenes/mainScene";
import { SceneTwo } from "../scenes/sceneTwo";
import { SceneThree } from "../scenes/sceneThree";

export class SceneManager{
    constructor(renderer, portalEffect) {
		this.scenes = {
			main: new MainScene(portalEffect, renderer, this.switchScenes.bind(this)),
			sceneTwo: new SceneTwo(portalEffect),
			sceneThree: new SceneThree(portalEffect),
		};

		this.currentScene = this.scenes.main
		this.renderer = renderer
		this.currentScene.add(renderer.camera)

    }

	getCurrentScene(){
		return this.currentScene
	}


    switchScenes(sceneName) {
		if (this.scenes[sceneName]) {
			this.currentScene = this.scenes[sceneName];
		}

		this.addParticles();
	}

	addParticles() {
		if (this.currentScene === this.scenes["sceneTwo"]) {
			const textureLoader = new THREE.TextureLoader();
			textureLoader.load(
				"/textures/particles/8.png",
				(texture) => {
					const particleCount = 5000;
					const positions = new Float32Array(particleCount * 3);

					for (let i = 0; i < particleCount; i++) {
						positions[i] = (Math.random() - 0.5) * 50;
					}

					const geometry = new THREE.BufferGeometry();
					geometry.setAttribute(
						"position",
						new THREE.BufferAttribute(positions, 3)
					);

					const materials = new THREE.PointsMaterial({
						color: "white",
						size: 0.1,
						map: texture,
						alphaMap: texture,
						alphaTest: 0.001,
						depthTest: false,
						depthWrite: false,
						blending: THREE.AdditiveBlending,
					});

					const sceneTwoParticles = new THREE.Points(geometry, materials);
					this.currentScene.add(sceneTwoParticles);
					sceneTwoParticles.position.set(0, 7, 0);
				},
				undefined,
				(error) => {
					console.error("Error loading texture:", error);
				}
			);
		}

		if (this.currentScene === this.scenes["sceneThree"]) {
			const geometry = new THREE.TorusGeometry();
			const materials = new THREE.PointsMaterial({
				color: "#ff88cc",
				size: 0.2,
			});

			const sceneThreeParticles = new THREE.Points(geometry, materials);
			this.currentScene.add(sceneThreeParticles);
		}
	}

	update(elapsedTime) {
        this.currentScene.update(elapsedTime);
    }
}