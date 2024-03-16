import { Factory } from "fishery"
import { BookType } from "../../types/bookType"

export const bookFactory = Factory.define<BookType>(({ sequence }) => ({
  id: sequence,
  title: `Book ${sequence}`,
  author: `Author ${sequence}r`,
}))
