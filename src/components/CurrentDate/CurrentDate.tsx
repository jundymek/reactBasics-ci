export const CurrentDate = () => {
  const today = new Date().toDateString()

  return <div>{`Today's date is ${today}`}</div>
}
