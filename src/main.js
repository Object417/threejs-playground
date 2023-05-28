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
import { loadAug } from "./components/models/aug"
import { loadAk } from "./components/models/ak"

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
loadM4A1(scene)
loadAug(scene)
loadAk().then((obj) => {
  obj.scale.set(0.015, 0.015, 0.015)

  // fixes incorrect model position
  // obj.children[0].geometry.center()

  const box = new Box3().setFromObject(obj)
  const vector = new Vector3()

  const { x: sizeX, y: sizeY, z: sizeZ } = box.getSize(vector)
  const { x: centerX, y: centerY, z: centerZ } = box.getCenter(obj.position)

  obj.position.set(30, (sizeY - centerY) / 2, 0)
  obj.rotation.y = Math.PI
  // obj.children[0].position.set(0, 0, 0)

  obj.traverse((node) => {
    if (node.isMesh) {
      node.receiveShadow = true
      node.castShadow = true
    }
  })

  loopChildren(obj.children)
  function loopChildren(children) {
    for (const node of children) {
      if (node.isMesh) {
        node.geometry.center()
        return
      } else {
        if (node.children.length !== 0) {
          loopChildren(node.children)
        }
      }
    }
  }

  scene.add(obj)
})

// #animate
animate()
function animate() {
  updateRendererSize()
  renderer.render(scene, camera)
  controls.update()

  requestAnimationFrame(animate)
}
