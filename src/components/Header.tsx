export const Header = () => {
  const methodDoesNotExist = () => {
    throw new Error("Method does not exist")
  }

  return (
    <div className="p-2 bg-white">
      <h1 className="text-2xl font-bold">
        <a href="/">Dev path &lt;/&gt; </a>
      </h1>
      <button onClick={() => methodDoesNotExist()}>Break the world</button>;
    </div>
  )
}
