import { ComplicatedForm } from "../components/ComplicatedForm"
import { SimpleForm } from "../components/SimpleForm/SimpleForm"

export const Forms = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full bg-red-200">
      <SimpleForm />
      <ComplicatedForm />
    </div>
  )
}
