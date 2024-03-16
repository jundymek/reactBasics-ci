import React from "react"
import { useState } from "react"

export const SimpleForm = () => {
  const [isActive, setIsActive] = useState(true)
  const [name, setName] = useState<string>()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(name)
    setIsActive(false)
  }

  const handleToggleEdit = () => {
    setIsActive((prev) => !prev)
  }

  return (
    <div>
      <h2>Create and edit form</h2>
      {isActive ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" value={name || ""} onChange={handleChange} placeholder="Name" />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <p>{name}</p>
      )}
      {!isActive && <button onClick={handleToggleEdit}>Edit form</button>}
    </div>
  )
}
