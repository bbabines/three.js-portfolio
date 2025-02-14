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
            sizeAttenuation: this.particleProps.sizeAttenuation,
            map: this.particleProps.textureMap,
            alphaMap: this.particleProps.alphaMap,
            transparent: this.particleProps.textureTransparency,
            alphaTest: this.particleProps.alphaTest,
            depthTest: this.particleProps.depthTest,
            depthWrite: this.particleProps.depthWrite
        })

        console.log(this.material);
        

        this.particleSystem = new THREE.Points(this.geometry, this.material);
        this.scene.add(this.particleSystem)
    }
}
