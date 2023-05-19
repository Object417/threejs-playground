import { PCFSoftShadowMap, WebGLRenderer } from "three"
import camera from "./camera"

const $container = document.getElementById("three-container")
const { width, height } = $container.getBoundingClientRect()

const renderer = new WebGLRenderer({ antialias: true, alpha: true })
renderer.setSize(width, height, true)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = PCFSoftShadowMap

function updateRendererSize() {
  const $canvas = renderer.domElement

  const { width: canvasWidth, height: canvasHeight } =
    $canvas.getBoundingClientRect()
  const { width: containerWidth, height: containerHeight } =
    $container.getBoundingClientRect()

  if (canvasWidth === containerWidth && canvasHeight === containerHeight) {
    return
  }

  renderer.setSize(containerWidth, containerHeight)
  camera.aspect = containerWidth / containerHeight
  camera.updateProjectionMatrix()
}

export { updateRendererSize }
export default renderer
