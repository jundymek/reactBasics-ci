describe("DeleteBook", () => {
  beforeEach(() => {
    // Intercepting GraphQL queries and simulating the initial list of books

    cy.visit("/book-list-graphql")
  })

  it("leaves one book after deleting one of two", () => {
    cy.intercept("POST", "/graphql", (req) => {
      if (req.body.operationName === "GetBooks") {
        req.reply({
          data: {
            books: [
              { __typename: "Book", id: "1", title: "Test Book Title 1", author: "Test Author 1" },
              { __typename: "Book", id: "2", title: "Test Book Title 2", author: "Test Author 2" },
            ],
          },
        })
      }
    }).as("getBooksInitialTwo")

    cy.wait("@getBooksInitialTwo")
    // Intercepting and simulating book deletion
    cy.intercept("POST", "/graphql", (req) => {
      if (req.body.operationName === "DeleteBook") {
        const { id } = req.body.variables
        req.reply({
          data: {
            deleteBook: {
              __typename: "Book",
              id: id,
            },
          },
        })
      } else if (req.body.operationName === "GetBooks") {
        // Simulating the list with one book after deletion
        req.reply({
          data: {
            books: [
              {
                __typename: "Book",
                id: "2",
                title: "Test Book Title 2",
                author: "Test Author 2",
              },
            ],
          },
        })
      }
    }).as("deleteAndGetBooks")

    cy.get('[data-cy="delete-book-button-1"]').click()
    cy.wait("@deleteAndGetBooks")

    // Checking if one book remains
    cy.get('[data-cy="book-list"]').should("exist")
    cy.get("body").should("not.contain", "Test Book Title 1")
    cy.get("body").should("contain", "Test Book Title 2")
  })

  it("does not render the book list after deleting the last book", () => {
    // Intercepting and simulating the deletion of the last book
    cy.intercept("POST", "/graphql", (req) => {
      if (req.body.operationName === "GetBooks") {
        req.reply({
          data: {
            books: [{ __typename: "Book", id: "2", title: "Test Book Title 2", author: "Test Author 2" }],
          },
        })
      }
    }).as("getBooksInitialOne")

    cy.wait("@getBooksInitialOne")

    cy.intercept("POST", "/graphql", (req) => {
      if (req.body.operationName === "DeleteBook") {
        req.reply({
          data: {
            deleteBook: {
              __typename: "Book",
              id: req.body.variables.id,
            },
          },
        })
      } else if (req.body.operationName === "GetBooks") {
        // Simulating an empty list of books
        req.reply({
          data: {
            books: [],
          },
        })
      }
    }).as("deleteAndGetBooksEmpty")

    cy.get('[data-cy="delete-book-button-2"]').click()
    cy.wait("@deleteAndGetBooksEmpty")

    // Checking if the book list is no longer rendered
    cy.get('[data-cy="book-list"]').should("not.exist")
  })
})
