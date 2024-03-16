import { generateLongList } from "../../utils/virtualizedList"

export const NonVirtualizedList = () => {
  const items = generateLongList(1000)
  return (
    <div className="h-[400px] overflow-auto">
      <h2>No virtualized list</h2>
      {items.map((item, index) => (
        <div key={index} className="ListItem">
          {item}
        </div>
      ))}
    </div>
  )
}
