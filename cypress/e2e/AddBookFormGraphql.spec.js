describe("AddBookFormGraphql", () => {
  let bookAdded = false // Flag to track if a book has been added
  let bookDeleted = false // Flag to track if a book has been deleted

  beforeEach(() => {
    // Intercept the GetBooks query
    cy.intercept("POST", "/graphql", (req) => {
      if (req.body.operationName === "GetBooks") {
        if (!bookAdded || bookDeleted) {
          // Initial state, before adding a book
          req.reply({
            data: {
              books: [],
            },
          })
        } else {
          // State after adding a book
          req.reply({
            data: {
              books: [
                {
                  __typename: "Book",
                  id: "1",
                  title: "Test Book Title",
                  author: "Test Author",
                },
              ],
            },
          })
        }
      }
    }).as("getBooks")

    // Intercept the CreateBook mutation
    cy.intercept("POST", "/graphql", (req) => {
      if (req.body.operationName === "CreateBook") {
        bookAdded = true // Set the flag when a book is added
        req.reply({
          data: {
            createBook: {
              __typename: "Book",
              id: "1",
              title: req.body.variables.title,
              author: req.body.variables.author,
            },
          },
        })
      }
    }).as("createBook")

    cy.intercept("POST", "/graphql", (req) => {
      if (req.body.operationName === "DeleteBook") {
        bookDeleted = true // Set the flag when a book is deleted
        req.reply({
          data: {
            deleteBook: {
              __typename: "Book",
              id: req.body.variables.id, // Assuming the mutation requires an ID
            },
          },
        })
      }
    }).as("deleteBook")

    // Visit the page
    cy.visit("/book-list-graphql")
  })

  it("allows adding a book and displays it in the list", () => {
    cy.visit("/book-list-graphql")
    // Initially, the book list should be empty
    cy.get("body").should("not.contain", "Test Book Title")
    cy.get("body").should("not.contain", "Test Author")

    // Fill out and submit the form
    cy.get('input[placeholder="Title"]').type("Test Book Title")
    cy.get('input[placeholder="Author"]').type("Test Author")
    cy.get("form").submit()

    // Wait for the CreateBook mutation and the subsequent GetBooks query
    cy.wait("@createBook")
    cy.wait("@getBooks")

    // Now, the book list should contain the added book
    cy.get('[data-cy="book-title"]').contains("Test Book Title").should("be.visible")
    cy.contains("td", "Test Author").should("be.visible")
  })

  it("allows deleting a book and removes it from the list", () => {
    // Ensure the book is added first
    cy.get('input[placeholder="Title"]').type("Test Book Title")
    cy.get('input[placeholder="Author"]').type("Test Author")
    cy.get("form").submit()

    // Wait for the book to be added
    cy.wait("@createBook")
    cy.wait("@getBooks")

    // Now, delete the book
    // Adjust the selector to target the delete button for the specific book
    cy.get('[data-cy="delete-book-button"]').click()

    // Wait for the DeleteBook mutation and the subsequent GetBooks query
    cy.wait("@deleteBook")
    cy.wait("@getBooks")

    // The book list should no longer contain the deleted book
    cy.get("body").should("not.contain", "Test Book Title")
    cy.get("body").should("not.contain", "Test Author")
  })
})
