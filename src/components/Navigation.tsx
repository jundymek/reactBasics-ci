import { Link } from "react-router-dom"

export const Navigation = () => {
  return (
    <div className="flex justify-center items-center min-w-full h-full">
      <ul className="flex flex-col items-center">
        <li className="p-0">
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/conditional-rendering">Conditional Rendering</Link>
        </li>
        <li className="ml-0">
          <Link to="/forms">Forms</Link>
        </li>
        <li>
          <Link to="/api-calls">Api calls (Book List)</Link>
        </li>
        <li>
          <Link to="/book-list-graphql">Book List Graphql</Link>
        </li>
        <li>
          <Link to="/styling3">Styling 3</Link>
        </li>
        <li>
          <Link to="/virtualized-list">Virtualized list</Link>
        </li>
        <li>
          <Link to="/render-props">Render Props</Link>
        </li>
        <li>
          <Link to="/generic-component">Generic Component</Link>
        </li>
        <li>
          <Link to="/current-date">Current Date</Link>
        </li>
        <li>
          <Link to="/graphql-subscription">GraphQL Subscription</Link>
        </li>
      </ul>
    </div>
  )
}
