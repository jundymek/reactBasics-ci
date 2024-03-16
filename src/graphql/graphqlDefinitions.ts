import { gql } from "@apollo/client"

export const BOOK_FRAGMENT = gql`
  fragment BookFields on Book {
    id
    title
    author
  }
`
