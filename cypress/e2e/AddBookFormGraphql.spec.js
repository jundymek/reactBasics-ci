describe("AddBookFormGraphql", () => {
  let bookAdded = false // Flag to track if a book has been added

  beforeEach(() => {
    // Reset the flag before each test
    bookAdded = false

    // Intercept the GetBooks query
    cy.intercept("POST", "/graphql", (req) => {
      if (req.body.operationName === "GetBooks") {
        if (!bookAdded) {
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

    // Visit the page
    cy.visit("/book-list-graphql")
  })

  it("allows adding a book and displays it in the list", () => {
    // Initially, the book list should be empty
    cy.wait("@getBooks").then(() => {
      cy.get("body").should("not.contain", "Test Book Title")
      cy.get("body").should("not.contain", "Test Author")
    })

    // Fill out and submit the form
    cy.get('input[placeholder="Title"]').type("Test Book Title")
    cy.get('input[placeholder="Author"]').type("Test Author")
    cy.get("form").submit()

    // Wait for the CreateBook mutation and the subsequent GetBooks query
    cy.wait("@createBook").then(() => {
      cy.wait("@getBooks").then(() => {
        // Now, the book list should contain the added book
        cy.get('[data-cy="book-title-1"]').contains("Test Book Title").should("be.visible")
        cy.contains("td", "Test Author").should("be.visible")
      })
    })
  })
})
