import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const addressSchema = z.object({
  city: z.string().refine((value) => value.length > 0, "City is required!"),
  zipCode: z
    .string()
    .refine((value) => value.length > 0, "Zip code is required!")
    .refine((value) => /^\d{2}-\d{3}$/.test(value), "Zip code must be in xx-xxx format"),
  street: z.string().refine((value) => value.length > 0, "Street name is required!"),
})

const formSchema = z.object({
  addresses: z.array(addressSchema),
})

type FormValues = z.infer<typeof formSchema>

export const ComplicatedForm = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      addresses: [{ city: "", zipCode: "", street: "" }],
    },
    resolver: zodResolver(formSchema),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "addresses",
  })

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  const handleAddNewRow = () => {
    append({ city: "", zipCode: "", street: "" })
  }

  const handleReset = () => {
    reset({
      addresses: [{ city: "", zipCode: "", street: "" }],
    })
  }

  return (
    <div className="my-4">
      <h3 className="mb-2">Address form - react-hook-form + zod validation</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((item, index) => (
          <div key={item.id} className="flex flex-col mb-2">
            <fieldset className="flex gap-2 items-center">
              <div className="flex flex-col">
                <input {...register(`addresses.${index}.city`)} placeholder="City" className="py-2 px-4 rounded-md" />
                {errors.addresses?.[index]?.city && (
                  <p className="text-red-500">{errors?.addresses?.[index]?.city?.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <input
                  {...register(`addresses.${index}.zipCode`)}
                  placeholder="Zip Code"
                  className="py-2 px-4 rounded-md"
                />
                {errors.addresses?.[index]?.zipCode && (
                  <p className="text-red-500">{errors?.addresses?.[index]?.zipCode?.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <input
                  {...register(`addresses.${index}.street`)}
                  placeholder="Street"
                  className="py-2 px-4 rounded-md"
                />
                {errors.addresses?.[index]?.street && (
                  <p className="text-red-500">{errors?.addresses?.[index]?.street?.message}</p>
                )}
              </div>
              {index > 0 && (
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                  onClick={() => remove(index)}
                >
                  Remove
                </button>
              )}
            </fieldset>
          </div>
        ))}
        <div className="flex justify-between">
          <div className="flex gap-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={handleAddNewRow}
            >
              Add Address
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
