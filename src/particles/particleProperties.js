import * as THREE from 'three'

export class ParticleProperties {
    constructor({
        geometry = new THREE.SphereGeometry(10, 10, 10),
        textureSize = 0.1,
        sizeAttenuation = true,
        textureColor = 'blue',
        textureMap,
        alphaMap,
        textureTransparency = true,
        alphaTest = 0.001,
        depthTest = false,
        depthWrite = false,
        blending = THREE.AdditiveBlending
    } = {}) {
        this.geometry = geometry
        this.textureSize = textureSize
        this.sizeAttenuation = sizeAttenuation
        this.textureColor = textureColor
        this.textureMap = textureMap
        this.alphaMap = alphaMap
        this.textureTransparency = textureTransparency
        this.alphaTest = alphaTest
        this.depthTest = depthTest
        this.depthWrite = depthWrite
        this.blending = blending
    }

}
