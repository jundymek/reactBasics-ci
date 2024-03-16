import { useQuery } from "@tanstack/react-query"
import { BookType } from "../../types/bookType"

const fetchSingleBook = async (bookId: number) => {
  const response = await fetch(`http://localhost:3001/books/${bookId}`)
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json() as Promise<BookType>
}

export const useGetSingleBook = (bookId: number) => {
  return useQuery({
    queryKey: ["book", bookId],
    queryFn: () => fetchSingleBook(bookId),
    retry: 2,
    retryDelay: 2000,
  })
}
