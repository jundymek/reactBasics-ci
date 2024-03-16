import React from "react"
import { render, fireEvent } from "@testing-library/react"
import { SimpleForm } from "./SimpleForm"
import { screen } from "@testing-library/dom"
import "@testing-library/jest-dom"

describe("SimpleForm", () => {
  test("renders form with input and submit button", () => {
    render(<SimpleForm />)
    expect(screen.getByLabelText("Name")).toBeTruthy()
    expect(screen.getByRole("button", { name: /submit/i })).toBeTruthy()
  })

  test("updates input value on change", () => {
    render(<SimpleForm />)
    const input = screen.getByLabelText("Name")
    fireEvent.change(input, { target: { value: "Test Name" } })
    expect(input).toEqual(screen.getByDisplayValue("Test Name"))
  })

  test("submits form and displays name", () => {
    render(<SimpleForm />)
    const input = screen.getByLabelText("Name")
    const button = screen.getByRole("button", { name: /submit/i })
    fireEvent.change(input, { target: { value: "Test Name" } })
    fireEvent.click(button)
    expect(screen.getByText("Test Name")).toBeTruthy()
  })

  test("toggles form edit", () => {
    render(<SimpleForm />)
    const input = screen.getByLabelText("Name")
    const submitButton = screen.getByRole("button", { name: /submit/i })
    fireEvent.change(input, { target: { value: "Test Name" } })
    fireEvent.click(submitButton)
    const editButton = screen.getByRole("button", { name: /edit form/i })
    fireEvent.click(editButton)
    // Check if the form is back in edit mode with the input field present
    expect(screen.getByLabelText("Name")).toBeInTheDocument()
    // Optionally, check if the input field is reset to empty or retains its value
    expect((screen.getByLabelText("Name") as HTMLInputElement).value).toBe("Test Name")
  })
})
