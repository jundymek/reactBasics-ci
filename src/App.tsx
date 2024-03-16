import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Layout } from "./layouts/Layout"
import { Navigation } from "./components/Navigation"
import { ApiCalls } from "./pages/ApiCalls"
import { ConditionalRendering } from "./pages/ConditionalRendering"
import { Forms } from "./pages/Forms"
import { UserPage } from "./pages/UserPage"
import { SingleBook } from "./pages/SingleBook"
import { Styling3 } from "./pages/Styling3"
import { VirtualizedListPage } from "./pages/VirtualizedListPage"
import { ErrorBoundary } from "react-error-boundary"
import * as Sentry from "@sentry/react"
import { RenderPropsPage } from "./pages/RenderPropsPage"
import { GenericComponent } from "./pages/GenericComponent"
import { CurrentDateTestPage } from "./pages/CurrentDateTestPage"
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, split } from "@apollo/client"
import { getMainDefinition } from "@apollo/client/utilities"
import { WebSocketLink } from "@apollo/client/link/ws"
import { GraphqlSubscription } from "./pages/GraphqlSubscription"
import { BookListGraphqlPage } from "./pages/BookListGraphqlPage"
import { SingleBookGraphql } from "./pages/SingleBookGraphql"

Sentry.init({
  dsn: "https://e8dbc539794b8d76d4c6c2b61d2cbd1e@o4506865523228672.ingest.us.sentry.io/4506865580113920",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/joyful-crumble-5dc627.netlify\.app/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
})

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
})

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
  },
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === "OperationDefinition" && definition.operation === "subscription"
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
})

const RouteWithErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return <ErrorBoundary fallback={<div>Something went wrong</div>}>{children}</ErrorBoundary>
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RouteWithErrorBoundary>
        <Navigation />
      </RouteWithErrorBoundary>
    ),
  },
  {
    path: "/conditional-rendering",
    element: (
      <RouteWithErrorBoundary>
        <ConditionalRendering />
      </RouteWithErrorBoundary>
    ),
  },
  {
    path: "/user/:userId",
    element: (
      <RouteWithErrorBoundary>
        <UserPage />
      </RouteWithErrorBoundary>
    ),
    errorElement: <div>Something went wrong - BUTTON</div>,
  },
  {
    path: "/forms",
    element: <Forms />,
  },
  {
    path: "/book/:bookId",
    element: <SingleBook />,
  },
  {
    path: "/book-graphql/:bookId",
    element: <SingleBookGraphql />,
  },
  {
    path: "/api-calls",
    element: (
      <RouteWithErrorBoundary>
        <ApiCalls />
      </RouteWithErrorBoundary>
    ),
  },
  {
    path: "book-list-graphql",
    element: <BookListGraphqlPage />,
  },
  {
    path: "/styling3",
    element: <Styling3 />,
  },
  {
    path: "/virtualized-list",
    element: <VirtualizedListPage />,
  },
  {
    path: "/render-props",
    element: <RenderPropsPage />,
  },
  {
    path: "/generic-component",
    element: <GenericComponent />,
  },
  {
    path: "/current-date",
    element: <CurrentDateTestPage />,
  },
  {
    path: "/graphql-subscription",
    element: <GraphqlSubscription />,
  },
])

function App() {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </ApolloProvider>
  )
}

export default App
