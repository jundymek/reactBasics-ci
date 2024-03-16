import { useQuery } from "@tanstack/react-query"
import { BookType } from "../../types/bookType"

const fetchPosts = async () => {
  const response = await fetch("http://localhost:3001/books")
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json() as Promise<BookType[]>
}

export const useGetBooks = () => {
  return useQuery({
    queryKey: ["books"],
    queryFn: fetchPosts,
    retry: 2,
    retryDelay: 2000,
  })
}
