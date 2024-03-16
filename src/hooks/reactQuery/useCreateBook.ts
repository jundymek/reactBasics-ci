// src/hooks/useCreatePost.ts
import { useMutation, useQueryClient } from "@tanstack/react-query"

type NewBookType = {
  title: string
  author: string
}

export const useCreateBook = () => {
  const queryClient = useQueryClient()
  return useMutation<void, Error, NewBookType>({
    mutationFn: async (newBook: NewBookType) => {
      const booksResponse = await fetch("http://localhost:3001/books")
      if (!booksResponse.ok) {
        throw new Error("Failed to fetch books")
      }
      const books = await booksResponse.json()
      const nextId = books.reduce((maxId: number, book: { id: number }) => Math.max(book.id, maxId), 0) + 1

      // Create the new book with the next ID
      const response = await fetch("http://localhost:3001/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newBook, id: nextId }),
      })
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
    },
    onSuccess: () => {
      // Invalidate the 'books' query to refetch the books list including the new book
      queryClient.invalidateQueries({ queryKey: ["books"] })
    },
  })
}
