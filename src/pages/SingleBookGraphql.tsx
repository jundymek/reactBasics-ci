import { useParams } from "react-router-dom"
import { BookDetailsGraphql } from "../components/BookListGraphql/BookDetailsGraphql"

export const SingleBookGraphql = () => {
  const { bookId } = useParams<{ bookId: string }>()

  if (!bookId) {
    return null
  }
  return <BookDetailsGraphql bookId={parseInt(bookId)} />
}
