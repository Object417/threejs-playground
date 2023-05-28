import { Box3, Vector3 } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

import vandalModel from "/src/models/vandal/vandal.glb?url"

function onLoad({ scene: obj }, scene) {
  obj.scale.set(20, 20, 20)

  const box = new Box3().setFromObject(obj)
  const vector = new Vector3()

  const { x: sizeX, y: sizeY, z: sizeZ } = box.getSize(vector)
  const { x: centerX, y: centerY, z: centerZ } = box.getCenter(obj.position)

  debugger

  // obj.position.set(centerX / 2 + 5 * sizeX, (sizeY - centerY) / 2, centerZ / 2)

  obj.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true
      // node.material = material
    }
  })

  scene.add(obj)
}

function loadVandal(scene) {
  new GLTFLoader().load(vandalModel, (obj) => onLoad(obj, scene))
}

export { loadVandal }
