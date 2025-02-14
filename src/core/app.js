import * as THREE from "three";
import { Renderer } from "./renderer";
import { MainScene } from "../scenes/mainScene";
import { SceneTwo } from "../scenes/sceneTwo";
import { SceneThree } from "../scenes/sceneThree";
import { Debug } from "../utils/debug";
import Stats from "stats.js";

export class App {
	constructor(canvas) {
		this.stats = new Stats();
		document.body.appendChild(this.stats.dom);
		this.debug = new Debug();

		this.canvas = canvas;
		this.renderer = new Renderer(canvas);

		this.scenes = {
			main: new MainScene(),
			sceneTwo: new SceneTwo(),
			sceneThree: new SceneThree(),
		};
		this.currentScene = this.scenes.main;
		this.currentScene.add(this.renderer.camera);
		
		this.clock = new THREE.Clock();
		this.animate();

		this.addPortalListener();
		console.log(this.renderer.info.render);
	}

	animate() {
		// Use elapsedTime for smooth animations between frames
		const elapsedTime = this.clock.getElapsedTime();

		this.renderer.update();
		this.currentScene.update(elapsedTime);

		this.stats.begin();
		this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom

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

		this.addParticles()
	}

	addParticles(){
		if(this.currentScene === this.scenes['sceneTwo']) {
			const textureLoader = new THREE.TextureLoader()
			textureLoader.load(
				'/textures/particles/8.png',
				(texture) => {

					const particleCount = 5000
					const positions = new Float32Array(particleCount * 3)

					for (let i = 0; i < particleCount; i++) {
						positions[i] = (Math.random() - 0.5) * 10; 
					}

					const geometry = new THREE.BufferGeometry()
					geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

					const materials = new THREE.PointsMaterial({
							color: 'blue',
							size: 0.1,
							map: texture,
							alphaMap: texture,
							transparency: true,
							alphaTest: 0.001,
							depthTest: false,
							depthWrite: false,
							blending: THREE.AdditiveBlending
						})
				
					const sceneTwoParticles = new THREE.Points(geometry, materials)
					this.currentScene.add(sceneTwoParticles)
					
				},
				undefined,
				(error) => {
					console.error('Error loading texture:', error)
				}
			)
		}

		if(this.currentScene === this.scenes['sceneThree']) {
			const geometry = new THREE.TorusGeometry()
			const materials = new THREE.PointsMaterial({
					color: "#ff88cc",
					size: 0.2
				})
			
			const sceneThreeParticles = new THREE.Points(geometry, materials )
			this.currentScene.add(sceneThreeParticles)
		}
	}
}
