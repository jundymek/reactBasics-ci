import React from "react"
import { gql, useQuery, useMutation } from "@apollo/client"
import { BookType } from "../../types/bookType"
import { useNavigate } from "react-router-dom"
import { AddBookFormGraphql } from "./AddBookFormGraphql"
import { BOOK_FRAGMENT } from "../../graphql/graphqlDefinitions"

export const GET_BOOKS_QUERY = gql`
  query GetBooks {
    books {
      ...BookFields
    }
  }
  ${BOOK_FRAGMENT}
`

const DELETE_BOOK_MUTATION = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id) {
      id
    }
  }
`

export const BookListGraphql = () => {
  const { data, loading, error } = useQuery(GET_BOOKS_QUERY)
  const [deleteBook] = useMutation(DELETE_BOOK_MUTATION, {
    refetchQueries: [{ query: GET_BOOKS_QUERY }],
    optimisticResponse: {
      __typename: "Mutation",
      deleteBook: {
        __typename: "Book",
        id: "", // We don't know the ID yet, but Apollo needs something
      },
    },
    update: (cache, { data: { deleteBook } }) => {
      const existingBooks = cache.readQuery({ query: GET_BOOKS_QUERY }) as { books: BookType[] }
      const newBooks = existingBooks.books.filter((book: BookType) => book.id !== deleteBook.id)
      cache.writeQuery({ query: GET_BOOKS_QUERY, data: { books: newBooks } })
    },
  })
  const navigate = useNavigate()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error loading books.</div>

  const handleDelete = (id: number) => {
    deleteBook({ variables: { id }, optimisticResponse: { deleteBook: { id, __typename: "Book" } } })
  }

  const navigateToBookDetails = (id: number) => {
    navigate(`/book-graphql/${id}`)
  }

  return (
    <>
      <table className="table-auto w-full mb-10">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Author</th>
            <th className="px-4 py-2">Actions</th>
            <th className="px-4 py-2">Details</th>
          </tr>
        </thead>
        <tbody>
          {data?.books?.map((book: BookType) => (
            <tr key={book.id}>
              <td className="border px-4 py-2">{book.id}</td>
              <td data-cy="book-title" className="border px-4 py-2">
                {book.title}
              </td>
              <td className="border px-4 py-2">{book.author}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(book.id)}
                  data-cy="delete-book-button"
                >
                  Delete
                </button>
              </td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => navigateToBookDetails(book.id)}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AddBookFormGraphql />
    </>
  )
}
