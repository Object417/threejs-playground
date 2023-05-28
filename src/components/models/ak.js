import { Box3, MeshPhongMaterial, Vector3 } from "three"

import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"

// import akUrl from "/src/models/ak47-cs2/source/AK47/AK47_CS2.fbx?url"
import akUrl from "/src/models/csgo-ak47-wild-lotus/source/AK47-WILDLOTUS/csgo_ak47_wild_lotus.glb?url"
// import akUrl from "/src/models/workbench_materials/OBJs/ak-47.obj?url"

function loadAk() {
  return new Promise((resolve, reject) => {
    new GLTFLoader().load(
      akUrl,
      (obj) => {
        resolve(obj.scene)
      },
      (e) => {},
      (err) => {
        console.error(err)
        reject(err)
      }
    )
  })

  new FBXLoader().load(akUrl, (obj) => {
    obj.scale.set(0.75, 0.75, 0.75)

    const box = new Box3().setFromObject(obj)
    const vector = new Vector3()

    const { x: sizeX, y: sizeY, z: sizeZ } = box.getSize(vector)
    const { x: centerX, y: centerY, z: centerZ } = box.getCenter(obj.position)

    obj.position.set(25, (sizeY - centerY) / 2, 0)
    const geometry = obj.children[0].geometry
    const material = new MeshPhongMaterial({})

    const mesh = new Mesh(geometry, material)

    obj.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true
      }
    })

    scene.add(obj)
  })
}

export { loadAk }
