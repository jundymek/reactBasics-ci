import { useParams } from "react-router-dom"
import { BookDetails } from "../components/BookDetails"

export const SingleBook = () => {
  const { bookId } = useParams<{ bookId: string }>()

  if (!bookId) {
    return null
  }
  return <BookDetails bookId={parseInt(bookId)} />
}
