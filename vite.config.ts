import { sentryVitePlugin } from "@sentry/vite-plugin"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  preview: {
    port: 5173,
  },
  plugins: [
    react(),
    sentryVitePlugin({
      org: "jundymek",
      project: "javascript-react",
    }),
  ],

  build: {
    sourcemap: true,
  },
})
