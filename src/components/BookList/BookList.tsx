import { useDeleteBook } from "../../hooks/reactQuery/useDeleteBook"
import { useGetBooks } from "../../hooks/reactQuery/useGetBooks"
import { BookType } from "../../types/bookType"
import { AddBookForm } from "../AddBookForm"
import { useNavigate } from "react-router-dom" // Import useNavigate

export const BookList = () => {
  const { data: books, isLoading, isFetching } = useGetBooks()
  const { mutate: deleteBook } = useDeleteBook()
  const navigate = useNavigate() // Initialize useNavigate

  if (isLoading) return <div>Loading...</div>

  const handleDelete = (id: number) => {
    deleteBook(id)
  }

  // Function to navigate to book details
  const navigateToBookDetails = (id: number) => {
    navigate(`/book/${id}`) // Assuming the route to book details is /book/:id
  }

  return (
    <>
      {isFetching && <div className="small-spinner">Updating...</div>}
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
          {books?.map((book: BookType) => (
            <tr key={book.id}>
              <td className="border px-4 py-2">{book.id}</td>
              <td className="border px-4 py-2">{book.title}</td>
              <td className="border px-4 py-2">{book.author}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(book.id)}
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

      <AddBookForm />
    </>
  )
}
