import { Box3, MeshPhongMaterial, Vector3 } from "three"
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"

import m4a1Url from "/src/models/M4A1/M4A1.obj?url"

const loader = new OBJLoader()
// silver 0xa8a9ad
const material = new MeshPhongMaterial({ color: 0x444444, specular: 0xffffff })

function onLoad(obj, scene) {
  const box = new Box3().setFromObject(obj)
  const vector = new Vector3()

  const { x: sizeX, y: sizeY, z: sizeZ } = box.getSize(vector)
  const { x: centerX, y: centerY, z: centerZ } = box.getCenter(obj.position)

  debugger

  obj.position.set(0, Math.abs(centerY) + sizeY / 2, 0)

  obj.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true
      node.material = material
    }
  })

  scene.add(obj)
}

function onProgress(e) {}

function onError(e) {}

async function loadM4A1(scene) {
  loader.load(m4a1Url, (obj) => onLoad(obj, scene))
}

export { loadM4A1 }
