import { PerspectiveCamera } from "three"

const $container = document.getElementById("three-container")
const { width, height } = $container.getBoundingClientRect()

const FOV = 90
const ASPECT_RATIO = width / height
const NEAR_CLIP = 0.1
const FAR_CLIP = 1000

const camera = new PerspectiveCamera(FOV, ASPECT_RATIO, NEAR_CLIP, FAR_CLIP)
camera.position.set(0, 50, 0)

export default camera
