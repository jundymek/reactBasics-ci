import { useGetSingleBook } from "../hooks/reactQuery/useGetSingleBook"
import { BookDetailsAnotherComponent } from "./BookDetailsAnotherComponent"

type BookDetailsProps = {
  bookId: number
}

export const BookDetails = ({ bookId }: BookDetailsProps) => {
  const { data: book, isLoading } = useGetSingleBook(bookId)

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="p-4 shadow-lg  bg-white">
        <h2 className="text-xl font-bold mb-4">Book details component</h2>
        <p className="text-lg">
          <strong>Title:</strong> {book?.title}
        </p>
        <p className="text-lg">
          <strong>Author:</strong> {book?.author}
        </p>
      </div>

      <BookDetailsAnotherComponent bookId={bookId} />
    </>
  )
}
