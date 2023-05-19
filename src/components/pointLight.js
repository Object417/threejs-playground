import { PointLight, PointLightHelper } from "three"

const pointLight = new PointLight(0xffffff, 0.5)
pointLight.position.set(-8, 15, 0)
pointLight.castShadow = true

const pointLightHelper = new PointLightHelper(pointLight, 1, 0xffdf00)

export { pointLightHelper }
export default pointLight
