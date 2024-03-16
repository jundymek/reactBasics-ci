import { SetStateAction, useEffect, useState } from "react"
import { IntervalComponent } from "../components/IntervalComponent"
import { Link } from "react-router-dom"

export const ConditionalRendering = () => {
  const [displayAdditionalField, setDisplayAdditionalField] = useState(false)
  const [selectedUser, setSelectedUser] = useState("")

  const handleClick = () => {
    setDisplayAdditionalField(!displayAdditionalField)
  }

  const handleChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSelectedUser(event.target.value)
  }

  const handleBlur = () => {
    console.log("Input field lost focus")
  }

  useEffect(() => {
    console.log(`useEffect - inputValue changed- new value: ${selectedUser}`)
  }, [selectedUser])

  return (
    <div className="h-full w-full p-4">
      <button
        className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg mb-4"
        onClick={handleClick}
      >
        Display/hide additional field
      </button>
      <div className="flex gap-5">
        <div className="rounded-lg p-2">Here I am - no additional field</div>
        {displayAdditionalField && <div className="rounded-lg p-2 mb-2 bg-red-500">Here I am - additional field</div>}
      </div>

      {!displayAdditionalField ? (
        <div className="rounded-lg p-2">Here I am not visible</div>
      ) : (
        <div className="rounded-lg p-2 bg-red-500">Here I am visible</div>
      )}

      <form>
        <label className="block mt-4" htmlFor="user">
          User:
        </label>
        <input type="text" value={selectedUser} onChange={handleChange} onBlur={handleBlur} className="mt-4 px-2" />
      </form>
      <Link className="text-blue-600 " to={`/user/${selectedUser}`}>
        You will pass {selectedUser} value in params
      </Link>
      <IntervalComponent initialCount={0} />
    </div>
  )
}
