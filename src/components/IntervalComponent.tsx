import { useEffect, useState } from "react"

type IntervalComponentProps = {
  initialCount: number
}

export const IntervalComponent = ({ initialCount }: IntervalComponentProps) => {
  const [counter, setCounter] = useState(initialCount)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter((prevCount) => prevCount + 1)
    }, 1000)

    // This function will be called when the component unmounts or when props change
    return () => {
      clearInterval(intervalId)
    }
  }, [initialCount])
  return <div className="text-center text-4xl">{counter}</div>
}
