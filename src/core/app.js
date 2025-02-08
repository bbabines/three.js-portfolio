import * as THREE from "three";
import { Renderer } from "./renderer";
import { MainScene } from "../scenes/mainScene";

export class App {
	constructor(canvas) {
		this.canvas = canvas;

		this.renderer = new Renderer(canvas);
		this.scene = new MainScene();

		this.scene.add(this.renderer.camera);

		// const clock = new THREE.Clock();
		this.clock = new THREE.Clock();
		this.animate();
	}

	animate() {
		// const animate = () => {
		// 	const elapsedTime = clock.getElapsedTime();

		// 	window.requestAnimationFrame(animate);
		// };
		const elapsedTime = this.clock.getElapsedTime();

		this.renderer.update();
		this.scene.update(elapsedTime);
		this.renderer.render(this.scene);

		window.requestAnimationFrame(() => this.animate());
	}
}
