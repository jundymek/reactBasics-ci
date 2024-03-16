import { render, screen } from "@testing-library/react"
import { CurrentDate } from "./CurrentDate"
import "@testing-library/jest-dom"

// Mock the global Date object
beforeAll(() => {
  const FIXED_DATE = new Date("2023-04-01T12:00:00Z")

  // Mock the global Date function to return a fixed date instance
  jest.spyOn(global, "Date").mockImplementation(() => FIXED_DATE)
})

afterAll(() => {
  // Restore the original Date object after tests
  jest.restoreAllMocks()
})

test("displays the current date", () => {
  render(<CurrentDate />)
  expect(screen.getByText("Today's date is Sat Apr 01 2023")).toBeInTheDocument()
})
