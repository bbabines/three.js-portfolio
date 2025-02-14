import * as THREE from 'three'
import { ParticleProperties } from './particleProperties'

export class ParticleEmitter {
    constructor(scene, {
        particleProps = new ParticleProperties()
    } = {}) {
        this.scene = scene
        this.particleProps = particleProps

        this.geometry = this.particleProps.geometry
        this.material = new THREE.PointsMaterial({
            size: this.particleProps.textureSize,
            color: this.particleProps.textureColor,
            transparent: this.particleProps.textureTransparency,
            // map: this.particleProps.texture,
        })

        this.particleSystem = new THREE.Points(this.geometry, this.material);
        this.scene.add(this.particleSystem)
    }
}
