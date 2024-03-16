import { useForm } from "react-hook-form"
import { gql, useApolloClient, useMutation } from "@apollo/client"
import { GET_BOOKS_QUERY } from "./BookListGraphql"
import { BOOK_FRAGMENT } from "../../graphql/graphqlDefinitions"
import { BookType } from "../../types/bookType"

type IFormInput = {
  title: string
  author: string
}

const CREATE_BOOK_MUTATION = gql`
  mutation CreateBook($title: String!, $author: String!) {
    createBook(title: $title, author: $author) {
      ...BookFields
    }
  }
  ${BOOK_FRAGMENT}
`

export const AddBookFormGraphql = () => {
  const { register, handleSubmit, reset } = useForm<IFormInput>()
  const client = useApolloClient()
  const data = client.readQuery({ query: GET_BOOKS_QUERY })
  const lastBookId = Number(data?.books[data.books.length - 1]?.id) || 0
  const [createBook] = useMutation(CREATE_BOOK_MUTATION, {
    optimisticResponse: {
      __typename: "Mutation",
      createBook: {
        __typename: "Book",
        id: "temp-id", // Temporary ID
        title: "Loading...",
        author: "Loading...",
      },
    },
    refetchQueries: [{ query: GET_BOOKS_QUERY }], // Refetch book list after creation
    update: (cache, { data: { createBook } }) => {
      // Read the current state of the query from the cache
      const existingBooks = cache.readQuery({ query: GET_BOOKS_QUERY }) as { books: BookType[] }
      // Add the new book to the cache
      const newBooks = existingBooks ? [...existingBooks.books, createBook] : [createBook]
      // Write the updated books list back to the cache
      cache.writeQuery({
        query: GET_BOOKS_QUERY,
        data: { books: newBooks },
      })
    },
  })

  const onSubmit = (data: IFormInput) => {
    createBook({
      variables: { title: data.title, author: data.author },
      optimisticResponse: {
        createBook: {
          __typename: "Book",
          id: lastBookId + 1,
          title: data.title,
          author: data.author,
        },
      },
    })
    reset() // Reset form fields after submission
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 items-center w-1/2 mx-auto">
      <input
        {...register("title")}
        type="text"
        placeholder="Title"
        required
        className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500 w-full"
      />
      <input
        {...register("author")}
        type="text"
        placeholder="Author"
        required
        className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
        Add Book
      </button>
    </form>
  )
}
