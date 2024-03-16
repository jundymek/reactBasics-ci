/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation CreateBook($title: String!, $author: String!) {\n    createBook(title: $title, author: $author) {\n      ...BookFields\n    }\n  }\n  \n": types.CreateBookDocument,
    "\n  query GetBookDetails($bookId: ID!) {\n    book(id: $bookId) {\n      ...BookFields\n    }\n  }\n  \n": types.GetBookDetailsDocument,
    "\n  query GetBookDetailsTwoBooks {\n    firstBook: book(id: 1) {\n      ...BookFields\n    }\n    secondBook: book(id: 4) {\n      ...BookFields\n    }\n  }\n  \n": types.GetBookDetailsTwoBooksDocument,
    "\n  query GetBookDetailsInclude($includeFirstBook: Boolean!, $includeSecondBook: Boolean!) {\n    firstBook: book(id: 1) {\n      title\n      author @skip(if: $includeFirstBook)\n    }\n    secondBook: book(id: 4) {\n      title @include(if: $includeSecondBook)\n      author\n    }\n  }\n  \n": types.GetBookDetailsIncludeDocument,
    "\n  query GetBooks {\n    books {\n      ...BookFields\n    }\n  }\n  \n": types.GetBooksDocument,
    "\n  mutation DeleteBook($id: ID!) {\n    deleteBook(id: $id) {\n      id\n    }\n  }\n": types.DeleteBookDocument,
    "\n  fragment BookFields on Book {\n    id\n    title\n    author\n  }\n": types.BookFieldsFragmentDoc,
    "\n  subscription OnTimeUpdated {\n    timeUpdated\n  }\n": types.OnTimeUpdatedDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateBook($title: String!, $author: String!) {\n    createBook(title: $title, author: $author) {\n      ...BookFields\n    }\n  }\n  \n"): (typeof documents)["\n  mutation CreateBook($title: String!, $author: String!) {\n    createBook(title: $title, author: $author) {\n      ...BookFields\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBookDetails($bookId: ID!) {\n    book(id: $bookId) {\n      ...BookFields\n    }\n  }\n  \n"): (typeof documents)["\n  query GetBookDetails($bookId: ID!) {\n    book(id: $bookId) {\n      ...BookFields\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBookDetailsTwoBooks {\n    firstBook: book(id: 1) {\n      ...BookFields\n    }\n    secondBook: book(id: 4) {\n      ...BookFields\n    }\n  }\n  \n"): (typeof documents)["\n  query GetBookDetailsTwoBooks {\n    firstBook: book(id: 1) {\n      ...BookFields\n    }\n    secondBook: book(id: 4) {\n      ...BookFields\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBookDetailsInclude($includeFirstBook: Boolean!, $includeSecondBook: Boolean!) {\n    firstBook: book(id: 1) {\n      title\n      author @skip(if: $includeFirstBook)\n    }\n    secondBook: book(id: 4) {\n      title @include(if: $includeSecondBook)\n      author\n    }\n  }\n  \n"): (typeof documents)["\n  query GetBookDetailsInclude($includeFirstBook: Boolean!, $includeSecondBook: Boolean!) {\n    firstBook: book(id: 1) {\n      title\n      author @skip(if: $includeFirstBook)\n    }\n    secondBook: book(id: 4) {\n      title @include(if: $includeSecondBook)\n      author\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBooks {\n    books {\n      ...BookFields\n    }\n  }\n  \n"): (typeof documents)["\n  query GetBooks {\n    books {\n      ...BookFields\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteBook($id: ID!) {\n    deleteBook(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteBook($id: ID!) {\n    deleteBook(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment BookFields on Book {\n    id\n    title\n    author\n  }\n"): (typeof documents)["\n  fragment BookFields on Book {\n    id\n    title\n    author\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription OnTimeUpdated {\n    timeUpdated\n  }\n"): (typeof documents)["\n  subscription OnTimeUpdated {\n    timeUpdated\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;