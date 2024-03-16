import React from "react"

type SharedFunctionalityProps = {
  render: (sharedData: { count: number; increment: () => void }) => JSX.Element
}

export const SharedCounter = ({ render }: SharedFunctionalityProps) => {
  const [count, setCount] = React.useState(0)

  const increment = () => setCount((prevCount) => prevCount + 1)

  return render({ count, increment })
}
