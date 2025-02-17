export class SceneManager{
    constructor(renderer, portalEffect) {

    }

    switchScenes(sceneName) {
		// Check amount of triangles upon switching scenes
		console.log(this.renderer.info.render);

		if (this.scenes[sceneName]) {
			this.currentScene = this.scenes[sceneName];
		}

		this.addParticles();
	}
}