import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { BookList } from "./BookList"
import * as reactQueryHooks from "../../hooks/reactQuery/useGetBooks"
import { QueryClient, QueryClientProvider, UseQueryResult } from "@tanstack/react-query"
import { BrowserRouter as Router } from "react-router-dom"
import "@testing-library/jest-dom"
import { BookType } from "../../types/bookType"
import preview from "jest-preview"
import { bookFactory } from "./bookFactory"
// import * as deleteBookHook from "../../hooks/reactQuery/useDeleteBook"

// Create a new QueryClient instance for testing
const queryClient = new QueryClient()

// Mock data for books
// const mockBooks = [
//   { id: 1, title: "Book 1", author: "Author 1" },
//   { id: 2, title: "Book 2", author: "Author 2" },
// ]

const mockBooks = [bookFactory.build(), bookFactory.build()]

// Mocking useGetBooks hook
jest.mock("../../hooks/reactQuery/useGetBooks", () => ({
  useGetBooks: jest.fn(),
}))

// // Mocking useDeleteBook hook
// jest.mock("../../hooks/reactQuery/useDeleteBook", () => ({
//   useDeleteBook: jest.fn(),
// }))

describe("BookList", () => {
  // Include any other properties that your component expects

  it("renders books and allows interaction", () => {
    // Mock the useGetBooks hook to return the desired data
    jest.spyOn(reactQueryHooks, "useGetBooks").mockImplementation(
      () =>
        ({
          data: mockBooks,
          isError: false,
          isLoading: false,
          isSuccess: true,
          status: "success",
          // Add any other properties as needed to match the UseQueryResult type
        } as UseQueryResult<BookType[], Error>)
    )

    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <BookList />
        </Router>
      </QueryClientProvider>
    )
    preview.debug()

    // Check if the books are rendered
    expect(screen.getByText("Book 1")).toBeInTheDocument()
    expect(screen.getByText("Book 2")).toBeInTheDocument()

    // Example interaction: Click on the 'Details' button of the first book
    fireEvent.click(screen.getAllByText("Details")[0])
    // You can add assertions here to check if the interaction leads to the expected outcome
    // For example, checking if the navigate function was called with the correct path
  })

  it("renders loading state", () => {
    // Mock the useGetBooks hook to return the desired loading state
    jest.spyOn(reactQueryHooks, "useGetBooks").mockImplementation(
      () =>
        ({
          isLoading: true,
        } as UseQueryResult<BookType[], Error>)
    )

    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <BookList />
        </Router>
      </QueryClientProvider>
    )
    // preview.debug()

    // Check if the loading state is rendered
    expect(screen.getByText("Loading...")).toBeInTheDocument()
  })
})
