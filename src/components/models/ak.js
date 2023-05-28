import { Box3, MeshPhongMaterial, Vector3 } from "three"

import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"

import akUrl from "/src/models/csgo-ak47-wild-lotus/source/AK47-WILDLOTUS/csgo_ak47_wild_lotus.glb?url"

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
}

export { loadAk }
