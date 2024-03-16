import { defineConfig } from "cypress"

// Determine the environment using an environment variable, defaulting to 'development'
const environment = process.env.NODE_ENV || "development"

// Set the baseUrl based on the environment
const baseUrl = environment === "development" ? "http://localhost:5173" : "http://localhost:4173"

export default defineConfig({
  e2e: {
    baseUrl,
    specPattern: "cypress/e2e/**/*.spec.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
