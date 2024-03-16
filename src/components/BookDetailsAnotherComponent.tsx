import { useQueryClient } from "@tanstack/react-query"
import { BookType } from "../types/bookType"

type BookDetailsAnotherComponentProps = {
  bookId: number
}

export const BookDetailsAnotherComponent = ({ bookId }: BookDetailsAnotherComponentProps) => {
  const queryClient = useQueryClient()
  const bookDetails = queryClient.getQueryData<BookType>(["book", bookId])

  if (!bookDetails) {
    return null
  }

  return (
    <div className="p-4 shadow-lg bg-blue-100">
      <h2 className="text-xl font-bold mb-4">Book details same data in other component (without fetching data)</h2>
      <p className="text-lg">
        <strong>Title:</strong> {bookDetails.title}
      </p>
      <p className="text-lg">
        <strong>Author:</strong> {bookDetails.author}
      </p>
    </div>
  )
}
