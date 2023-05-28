import { Box3, Color, MeshPhongMaterial, Vector3 } from "three"
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"

import palette from "../palette"
import scene from "../scene"
import m4a1Url from "/src/models/M4A1/M4A1.obj?url"
import m4a1MTL from "/src/models/M4A1/M4A1.mtl?url"

const $controls = document.getElementById("controls")
$controls.onchange = (e) => {
  const $control = e.target

  const node = scene.children
    .find((obj) => obj.name === "m4a1")
    .children.find((node) => node.isMesh && node.name === $control.name)
  node.visible = $control.checked
}

const objLoader = new OBJLoader()
const mtlLoader = new MTLLoader()

const material = new MeshPhongMaterial({
  color: new Color(palette.grey[800]),
  specular: new Color(palette.common.white)
})

function onLoad(obj, scene) {
  obj.scale.set(2, 2, 2)

  const box = new Box3().setFromObject(obj)
  const vector = new Vector3()

  const { x: sizeX, y: sizeY, z: sizeZ } = box.getSize(vector)
  const { x: centerX, y: centerY, z: centerZ } = box.getCenter(obj.position)

  obj.name = "m4a1"
  obj.position.set(0, Math.abs(centerY) + sizeY / 2, 0)

  obj.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true
      node.receiveShadow = true
      node.material = material

      $controls.innerHTML += `
        <div>
          <label>${node.name}: </label>
          <input type="checkbox" name="${node.name}" class="model-toggler" checked>
        </div>
      `
    }
  })

  scene.add(obj)
}

function onProgress(e) {}

function onError(e) {}

async function loadM4A1(scene) {
  mtlLoader.load(m4a1MTL, (materials) => {
    materials.preload()

    objLoader.setMaterials(materials).load(m4a1Url, (obj) => onLoad(obj, scene))
  })
}

export { loadM4A1 }
