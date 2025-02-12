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
		console.log(`Triangles: ${this.renderer.info.render.triangles}`);

		if (this.scenes[sceneName]) {
			this.currentScene = this.scenes[sceneName];
		}

		// @TODO - may need to add a camera to the current scene if it doesn't have one
		// if (!this.currentScene.children.includes(this.renderer.camera)) {
		// 	this.currentScene.add(this.renderer.camera);
		// }
	}
}
