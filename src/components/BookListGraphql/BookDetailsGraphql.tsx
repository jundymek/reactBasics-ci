import { useQuery, gql } from "@apollo/client"
import { BOOK_FRAGMENT } from "../../graphql/graphqlDefinitions"

const GET_BOOK_DETAILS = gql`
  query GetBookDetails($bookId: ID!) {
    book(id: $bookId) {
      ...BookFields
    }
  }
  ${BOOK_FRAGMENT}
`

const GET_BOOK_DETAILS_TWO_BOOKS = gql`
  query GetBookDetailsTwoBooks {
    firstBook: book(id: 1) {
      ...BookFields
    }
    secondBook: book(id: 4) {
      ...BookFields
    }
  }
  ${BOOK_FRAGMENT}
`

const GET_BOOK_DETAILS_INCLUDE = gql`
  query GetBookDetailsInclude($includeFirstBook: Boolean!, $includeSecondBook: Boolean!) {
    firstBook: book(id: 1) {
      title
      author @skip(if: $includeFirstBook)
    }
    secondBook: book(id: 4) {
      title @include(if: $includeSecondBook)
      author
    }
  }
  ${BOOK_FRAGMENT}
`

type BookDetailsGraphqlProps = {
  bookId: number
}

export const BookDetailsGraphql = ({ bookId }: BookDetailsGraphqlProps) => {
  const { loading, error, data } = useQuery(GET_BOOK_DETAILS, {
    variables: { bookId },
  })

  const { data: dataInclude } = useQuery(GET_BOOK_DETAILS_INCLUDE, {
    variables: { includeFirstBook: true, includeSecondBook: false },
  })

  const { data: dataTwoBooks, error: errorTwoBooks } = useQuery(GET_BOOK_DETAILS_TWO_BOOKS)

  if (loading) return <p>Loading...</p>
  if (error || errorTwoBooks) return <p>Error</p>

  return (
    <>
      <div className="p-4 shadow-lg bg-white">
        <h2 className="text-xl font-bold mb-4">Book details (GraphQL)</h2>
        <p className="text-lg">
          <strong>Title:</strong> {data.book.title}
        </p>
        <p className="text-lg">
          <strong>Author:</strong> {data.book.author}
        </p>
      </div>

      <h3>ALIAS</h3>
      {dataTwoBooks && (
        <div className="p-4 shadow-lg bg-white">
          <h2 className="text-xl font-bold mb-4">Book details (GraphQL)</h2>
          <h3 className="text-lg font-bold">First Book:</h3>
          <p className="text-lg">
            <strong>Title:</strong> {dataTwoBooks.firstBook.title}
          </p>
          <p className="text-lg">
            <strong>Author:</strong> {dataTwoBooks.firstBook.author}
          </p>
          <h3 className="text-lg font-bold">Second Book:</h3>
          <p className="text-lg">
            <strong>Title:</strong> {dataTwoBooks.secondBook.title}
          </p>
          <p className="text-lg">
            <strong>Author:</strong> {dataTwoBooks.secondBook.author}
          </p>
        </div>
      )}
      <h3>INCLUDE</h3>
      {dataInclude && (
        <div className="p-4 shadow-lg bg-white">
          <h2 className="text-xl font-bold mb-4">Book details (GraphQL)</h2>
          {dataInclude?.firstBook && (
            <>
              <h3 className="text-lg font-bold">First Book:</h3>
              <p className="text-lg">
                <strong>Title:</strong> {dataInclude.firstBook.title}
              </p>
              <p className="text-lg">
                <strong>Author:</strong> {dataInclude.firstBook.author}
              </p>
            </>
          )}
          {dataInclude?.secondBook && (
            <>
              <h3 className="text-lg font-bold">Second Book:</h3>
              <p className="text-lg">
                <strong>Title:</strong> {dataInclude.secondBook.title}
              </p>
              <p className="text-lg">
                <strong>Author:</strong> {dataInclude.secondBook.author}
              </p>
            </>
          )}
        </div>
      )}
    </>
  )
}
