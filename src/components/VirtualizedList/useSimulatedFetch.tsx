import { useState, useEffect } from "react"

export const useSimulatedFetch = (data: string[], delay: number = 1000) => {
  const [result, setResult] = useState<string[]>([])
  const [loading, setLoading] = useState(false) // Add a loading state

  useEffect(() => {
    setLoading(true) // Update loading state when effect runs
    const timer = setTimeout(() => {
      setResult(data)
      setLoading(false) // Update loading state when data is ready
    }, delay)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    // This is the crucial part for Suspense to work
    throw new Promise((resolve) => setTimeout(resolve, delay))
  }

  return result
}
