import * as THREE from "three";
import { Renderer } from "./renderer";
import { MainScene } from "../scenes/mainScene";
import { SceneTwo } from "../scenes/sceneTwo";
import { SceneThree } from "../scenes/sceneThree";
import { Debug } from "../utils/debug";
import Stats from "stats.js";
import { PortalEffect } from "../effects/portalEffects";

export class App {
	constructor(canvas) {
		this.stats = new Stats();
		document.body.appendChild(this.stats.dom);
		this.debug = new Debug();

		this.canvas = canvas;
		this.renderer = new Renderer(canvas);

		// Initialize the portal effect first
		this.portalEffect = new PortalEffect(
			this.renderer.renderer,
			this.renderer.camera
		);

		// Now initialize the scenes, passing the portalEffect into MainScene
		this.scenes = {
			main: new MainScene(this.portalEffect), // Pass the portalEffect here
			sceneTwo: new SceneTwo(),
			sceneThree: new SceneThree(),
		};

		this.currentScene = this.scenes.main;
		this.currentScene.add(this.renderer.camera);

		this.clock = new THREE.Clock();

		this.addPortalListener();

		this.animate();
		console.log(this.renderer.info.render);
	}

	animate() {
		const elapsedTime = this.clock.getElapsedTime();

		this.stats.begin();

		// Render the portal scene (looking through the portal's camera)
		if (this.portalEffect) {
			// Choose what scene you want to render
			this.portalEffect.render(this.scenes.sceneTwo);
		}

		// Render the main scene (which contains the portal plane)
		this.currentScene.update(elapsedTime);
		this.renderer.render(this.currentScene);

		this.stats.end();

		window.requestAnimationFrame(() => this.animate());
	}

	addPortalListener() {
		window.addEventListener("dblclick", (event) => {
			const nextScene = this.currentScene.handlePortalClick(
				event,
				this.renderer.camera
			);

			if (nextScene && this.scenes[nextScene]) {
				this.switchScenes(nextScene);
			}
		});
	}

	switchScenes(sceneName) {
		// Check amount of triangles upon switching scenes
		console.log(this.renderer.info.render);

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
						positions[i] = (Math.random() - 0.5) * 10;
					}

					const geometry = new THREE.BufferGeometry();
					geometry.setAttribute(
						"position",
						new THREE.BufferAttribute(positions, 3)
					);

					const materials = new THREE.PointsMaterial({
						color: "blue",
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
}
