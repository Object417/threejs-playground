import "./styles/main.scss"

import { Box3, TextureLoader, Vector3 } from "three"
import { TGALoader } from "three/examples/jsm/loaders/TGALoader"

import scene from "./components/scene"
import camera from "./components/camera"
import renderer, { updateRendererSize } from "./components/renderer"
import controls from "./components/controls"

import ambientLight from "./components/ambientLight"
import sunlight, { sunlightHelper } from "./components/sunlight"
import pointLight, { pointLightHelper } from "./components/pointLight"

import platform from "./components/models/platform"
import { loadM4A1 } from "./components/models/m4a1"
import { loadVandal } from "./components/models/vandal"
import { loadAug } from "./components/models/aug"
import { loadAk } from "./components/models/ak"

import akTexture from "/src/models/workbench_materials/UVSheets/ak-47.tga?url"
import akAsiimov from "/src/models/ak47-cs2/textures/ak47_asiimov.jpg"
import akLotus from "/src/models/csgo-ak47-wild-lotus/source/AK47-WILDLOTUS/ak_island_floral.tga?url"
import akBloodsport from "/src/models/ak47-cs2/textures/gs_ak47_bloodsport.jpg"
import akVulcan from "/src/models/ak47-cs2/textures/ak47_vulcan.jpg"

const $container = document.getElementById("three-container")
$container.appendChild(renderer.domElement)

// #light
scene.add(ambientLight)
scene.add(sunlight)
scene.add(sunlightHelper)
// scene.add(pointLight)
// scene.add(pointLightHelper)

// #platform
scene.add(platform)

// #objects
// loadM4A1(scene)
// loadVandal(scene)
// loadAug(scene)
loadAk().then((obj) => {
  obj.scale.set(0.02, 0.02, 0.02)

  // fixes incorrect model position
  // obj.children[0].geometry.center()

  const box = new Box3().setFromObject(obj)
  const vector = new Vector3()

  const { x: sizeX, y: sizeY, z: sizeZ } = box.getSize(vector)
  const { x: centerX, y: centerY, z: centerZ } = box.getCenter(obj.position)

  obj.position.set(0, (sizeY - centerY) / 2, 0)
  // obj.children[0].position.set(0, 0, 0)

  obj.traverse((node) => {
    if (node.isMesh) {
      node.receiveShadow = true
      node.castShadow = true
    }
  })

  const asiimovTexture = new TextureLoader().load(akAsiimov)
  const vulcanTexture = new TextureLoader().load(akVulcan)
  const bloodsportTexture = new TextureLoader().load(akBloodsport)
  const lotusTexture = new TGALoader().load(akLotus)

  loopChildren(obj.children)
  function loopChildren(children) {
    for (const node of children) {
      if (node.isMesh) {
        node.geometry.center()
        node.material.map = vulcanTexture
        return
      } else {
        if (node.children.length !== 0) {
          loopChildren(node.children)
        }
      }
    }
  }

  // obj.children[0].material.map = akLotus

  // const texture = new TGALoader().load(akTexture)
  // obj.children[0].material.map = lotusTexture

  scene.add(obj)

  debugger
})

// #animate
animate()
function animate() {
  updateRendererSize()
  renderer.render(scene, camera)
  controls.update()

  requestAnimationFrame(animate)
}
