import * as THREE from "three";
import { Renderer } from "./renderer";
import { MainScene } from "../scenes/mainScene";
import { SceneTwo } from "../scenes/sceneTwo";
import { SceneThree } from "../scenes/sceneThree";

export class App {
	constructor(canvas) {
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
	}

	animate() {
		// Use elapsedTime for smooth animations between frames
		const elapsedTime = this.clock.getElapsedTime();

		this.renderer.update();
		this.currentScene.update(elapsedTime);
		this.renderer.render(this.currentScene);

		window.requestAnimationFrame(() => this.animate());
	}
}
