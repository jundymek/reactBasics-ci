import { generateLongList } from "./virtualizedList"

describe("generateLongList", () => {
  it("should generate an empty list when length is 0", () => {
    const list = generateLongList(0)
    expect(list).toEqual([])
  })

  it("should generate a list of the specified length", () => {
    const length = 5
    const list = generateLongList(length)
    expect(list.length).toBe(length)
  })

  it("should generate a list with correctly formatted items", () => {
    const length = 3
    const list = generateLongList(length)
    expect(list).toEqual(["Item 1", "Item 2", "Item 3"])
  })
})
