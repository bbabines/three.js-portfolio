import * as THREE from "three";
import { Renderer } from "./renderer";
import { Debug } from "../utils/debug";
import Stats from "stats.js";
import { PortalEffect } from "../effects/portalEffects";
import { SceneManager } from "../utils/sceneManager";

export class App {
	constructor(canvas) {
		this.stats = new Stats();
		document.body.appendChild(this.stats.dom);
		this.debug = new Debug();

		this.canvas = canvas;
		this.renderer = new Renderer(canvas);

		this.portalEffect = new PortalEffect(
			this.renderer.renderer,
			this.renderer.camera
		);

		this.sceneManager = new SceneManager(this.renderer, this.portalEffect)

		this.clock = new THREE.Clock();
		this.animate();
		console.log(this.renderer.info.render);
	}

	animate() {
		const elapsedTime = this.clock.getElapsedTime();

		this.stats.begin();

		// Render the portal scene (looking through the portal's camera)
		if (this.portalEffect) {
			this.portalEffect.render(this.sceneManager.scenes.sceneTwo, this.sceneManager.scenes.sceneThree);
		}
		
		this.sceneManager.update(elapsedTime)
		this.renderer.render(this.sceneManager.getCurrentScene());

		this.stats.end();

		window.requestAnimationFrame(() => this.animate());
	}
}
