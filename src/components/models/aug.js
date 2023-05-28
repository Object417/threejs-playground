import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"
import { Box3, Vector3 } from "three"
import augUrl from "/src/models/aug-cs2/source/AUG/AUG_CS2.fbx?url"

function loadAug(scene) {
  new FBXLoader().load(augUrl, (obj) => {
    obj.scale.set(0.75, 0.75, 0.75)

    const box = new Box3().setFromObject(obj)
    const vector = new Vector3()

    const { x: sizeX, y: sizeY, z: sizeZ } = box.getSize(vector)
    const { x: centerX, y: centerY, z: centerZ } = box.getCenter(obj.position)

    obj.position.set(15, (sizeY - centerY) / 2, 0)
    obj.rotation.y = Math.PI

    obj.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true
        node.receiveShadow = true
      }
    })

    scene.add(obj)
  })
}

export { loadAug }
