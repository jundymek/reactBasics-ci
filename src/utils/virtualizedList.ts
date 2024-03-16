export const generateLongList = (length: number) => {
  return Array.from({ length }, (_, index) => `Item ${index + 1}`)
}
