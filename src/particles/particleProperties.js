import * as THREE from 'three'

export class ParticleProperties {
    constructor({
        geometry = new THREE.SphereGeometry(10, 10, 10),
        textureSize = 0.1,
        textureColor = 'red',
        textureTransparency = true,
        // textureMap = 
    } = {}) {
        this.geometry = geometry
        this.textureSize = textureSize
        this.textureColor = textureColor
        this.textureTransparency = textureTransparency
        // this.textureMap = textureMap
    }

}
