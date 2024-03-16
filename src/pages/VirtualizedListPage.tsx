import { Suspense, lazy } from "react"
import { NonVirtualizedList } from "../components/VirtualizedList/NonVirtualizedList"

export const VirtualizedListPage = () => {
  const SomeComponent = lazy(() => import("../components/VirtualizedList/VirtualizedList"))

  return (
    <div className="flex flex-col gap-10">
      <Suspense fallback={<div>Loading Virtualized List...</div>}>
        <SomeComponent />
      </Suspense>
      <NonVirtualizedList />
    </div>
  )
}
