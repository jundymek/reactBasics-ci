import React from "react"
import { useForm } from "react-hook-form"
import { useCreateBook } from "../hooks/reactQuery/useCreateBook"

interface IFormInput {
  title: string
  author: string
}

export const AddBookForm = () => {
  const { register, handleSubmit, reset } = useForm<IFormInput>()
  const createBook = useCreateBook()

  const onSubmit = (data: IFormInput) => {
    createBook.mutate({ title: data.title, author: data.author })
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
