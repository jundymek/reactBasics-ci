import { SharedCounter } from "../components/SharedCounter"

export const RenderPropsPage = () => {
  return (
    <div className="flex flex-col gap-10">
      <h3>RenderPropsPage</h3>
      <SharedCounter
        render={({ count, increment }) => (
          <div className="bg-red-500">
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
          </div>
        )}
      />
      <SharedCounter
        render={({ count, increment }) => (
          <div className="bg-blue-500">
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
          </div>
        )}
      />
    </div>
  )
}
