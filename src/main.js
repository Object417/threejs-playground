import "./styles/main.scss"

import scene from "./components/scene"
import camera from "./components/camera"
import renderer, { updateRendererSize } from "./components/renderer"
import controls from "./components/controls"

import ambientLight from "./components/ambientLight"
import sunlight, { sunlightHelper } from "./components/sunlight"
import pointLight, { pointLightHelper } from "./components/pointLight"

import platform from "./components/models/platform"
import { loadM4A1 } from "./components/models/m4a1"

const $container = document.getElementById("three-container")
$container.appendChild(renderer.domElement)

// #light
scene.add(ambientLight)
scene.add(sunlight)
scene.add(sunlightHelper)
scene.add(pointLight)
scene.add(pointLightHelper)

// #platform
scene.add(platform)

// #objects
loadM4A1(scene)

// #animate
animate()
function animate() {
  updateRendererSize()
  renderer.render(scene, camera)
  controls.update()

  requestAnimationFrame(animate)
}
