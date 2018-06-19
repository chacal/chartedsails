import { SKPosition } from "./SKPosition";

it("can load from JSON", () => {
  const pos = SKPosition.fromJSON('{ "latitude": 87.1, "longitude": -123.2, "altitude": -1}')
  expect(pos.latitude).toEqual(87.1)
  expect(pos.longitude).toEqual(-123.2)
  expect(pos.altitude).toEqual(-1)
})

it ("can ignore altitude", () => {
  const pos = SKPosition.fromJSON('{ "latitude": 87.1, "longitude": -123.2 }')
  expect(pos.latitude).toEqual(87.1)
  expect(pos.longitude).toEqual(-123.2)
  expect(pos.altitude).toBeUndefined()
})