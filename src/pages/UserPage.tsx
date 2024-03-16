import { useNavigate, useParams } from "react-router-dom"

export const UserPage = () => {
  const { userId } = useParams<{ userId: string }>()
  const navigate = useNavigate()
  const handleBackToConditionalRendering = () => {
    // Add the code to navigate to the ConditionalRendering component
    navigate("/conditional-rendering")
  }

  const handleError = () => {
    throw new Error("An error has occurred")
  }

  return (
    <>
      <button onClick={handleError}>Handle error</button>
      <span>Selected User ID: {userId}</span>
      <button
        className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg mb-4 w-max"
        onClick={handleBackToConditionalRendering}
      >
        Back to Conditional Rendering using useNavigage hook
      </button>
    </>
  )
}
