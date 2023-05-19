import {
  DoubleSide,
  FrontSide,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry
} from "three"

const width = 100
const height = 100

const geometry = new PlaneGeometry(width, height)
const material = new MeshStandardMaterial({ color: 0x999999, side: FrontSide })

const platform = new Mesh(geometry, material)
platform.position.set(0, 0, 0)
platform.rotation.x = (-90 * Math.PI) / 180
platform.receiveShadow = true

export default platform
