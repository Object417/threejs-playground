import { PointLight, PointLightHelper } from "three"

const sunlight = new PointLight(0xffffff, 1)
sunlight.position.set(20, 30, 8)
sunlight.castShadow = true

const sunlightHelper = new PointLightHelper(sunlight, 1, 0xffdf00)

export { sunlightHelper }
export default sunlight
