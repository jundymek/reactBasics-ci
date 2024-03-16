import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteBook = () => {
  const queryClient = useQueryClient()
  return useMutation<void, Error, number>({
    mutationFn: async (bookId: number) => {
      const response = await fetch(`http://localhost:3001/books/${bookId}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] })
    },
  })
}
