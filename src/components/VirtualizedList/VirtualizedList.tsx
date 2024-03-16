import { useVirtualizer } from "@tanstack/react-virtual"
import { useRef } from "react"
import { generateLongList } from "../../utils/virtualizedList"
import { useSimulatedFetch } from "./useSimulatedFetch"

const VirtualizedList = () => {
  const parentRef = useRef<HTMLDivElement>(null)

  const items = useSimulatedFetch(generateLongList(1000), 2000) // Simulate a 2-second fetch

  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 24,
  })

  return (
    <div ref={parentRef} className="h-[400px] w-full overflow-auto bg-blue-500">
      <h2>Virtualized list</h2>
      <div className={`relative w-full`} style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
        {rowVirtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.index}
            className={`w-full absolute top-0 left-0`}
            style={{
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            {items[virtualItem.index]}
          </div>
        ))}
      </div>
    </div>
  )
}

export default VirtualizedList
