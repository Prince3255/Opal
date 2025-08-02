import { UseMutateFunction } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z, { ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const useZodForm = (
  schema: ZodSchema,
  mutation: UseMutateFunction,
  defaultValue?: any
) => {
  const {
    register,
    watch,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { ...defaultValue },
  });
  
  const onFormSubmit = handleSubmit(async (value) => {
    console.log('Form submitted with values:', value);
    mutation({ ...value });
  });
  return { register, watch, reset, setValue, onFormSubmit, errors };
};

export default useZodForm;

// I'll explain the `useZodForm` hook in detail, breaking it down into its components and functionality:

// ```typescript
// import { UseMutateFunction } from "@tanstack/react-query";
// import { useForm } from "react-hook-form";
// import z, { ZodSchema } from "zod"
// import { zodResolver } from "@hookform/resolvers/zod"
// ```
// - Imports necessary dependencies:
//   - `UseMutateFunction`: Type from React Query for mutation functions
//   - `useForm`: Hook from react-hook-form for form management
//   - `z` and `ZodSchema`: For schema validation
//   - `zodResolver`: Connects Zod validation with react-hook-form

// ```typescript
// const useZodForm = (
//     schema: ZodSchema,           // Zod schema for validation
//     mutation: UseMutateFunction, // React Query mutation function
//     defaultValue?: any          // Optional default values for form fields
// ) => {
// ```
// - Creates a custom hook that takes 3 parameters:
//   1. `schema`: A Zod schema that defines the validation rules
//   2. `mutation`: The React Query mutation function to handle form submission
//   3. `defaultValue`: Optional default values for form fields

// ```typescript
//     const {
//         register,    // Function to register form fields
//         watch,       // Function to watch field values
//         reset,       // Function to reset form
//         handleSubmit,// Function to handle form submission
//         formState: { errors }, // Form errors
//     } = useForm<z.infer<typeof schema>>({
//         resolver: zodResolver(schema),
//         defaultValues: {...defaultValue},
//     })
// ```
// - Uses `useForm` from react-hook-form with:
//   - Generic type `z.infer<typeof schema>`: Infers TypeScript types from Zod schema
//   - `resolver: zodResolver(schema)`: Connects Zod validation
//   - `defaultValues`: Spreads default values into form

// ```typescript
//     const onFormSubmit = handleSubmit(async (value) => mutation({ ...value }) )
// ```
// - Creates a submission handler that:
//   1. Uses `handleSubmit` from react-hook-form
//   2. Takes form values and passes them to the mutation function
//   3. Spreads values into an object for the mutation

// ```typescript
//     return { register, watch, reset, onFormSubmit, errors }
// ```
// - Returns form utilities:
//   - `register`: Function to register form fields
//   - `watch`: Function to watch field values
//   - `reset`: Function to reset form
//   - `onFormSubmit`: Form submission handler
//   - `errors`: Form validation errors

// Here's a practical example of how to use this hook:

// ```typescript
// // Define a Zod schema
// const userSchema = z.object({
//     name: z.string().min(2),
//     email: z.string().email(),
//     age: z.number().min(18)
// });

// // In your component
// const CreateUserForm = () => {
//     const { mutate } = useMutationData(
//         ['create-user'],
//         createUserFunction,
//         'users'
//     );

//     const { register, errors, onFormSubmit } = useZodForm(
//         userSchema,
//         mutate,
//         { name: '', email: '', age: 18 } // default values
//     );

//     return (
//         <form onSubmit={onFormSubmit}>
//             <input {...register('name')} />
//             {errors.name && <span>{errors.name.message}</span>}

//             <input {...register('email')} />
//             {errors.email && <span>{errors.email.message}</span>}

//             <input type="number" {...register('age')} />
//             {errors.age && <span>{errors.age.message}</span>}

//             <button type="submit">Submit</button>
//         </form>
//     );
// };
// ```

// The benefits of this hook:

// 1. **Type Safety**:
//    - TypeScript types are inferred from Zod schema
//    - Form values are type-checked

// 2. **Validation**:
//    - Automatic validation using Zod schemas
//    - Error messages are available in the `errors` object

// 3. **Integration**:
//    - Seamlessly connects React Query mutations with forms
//    - Handles form submission and data transformation

// 4. **Reusability**:
//    - Can be used with any Zod schema
//    - Works with any React Query mutation

// 5. **Form Management**:
//    - Provides all necessary form utilities
//    - Handles form state and validation

// This hook is particularly useful when you need to:
// - Create forms with validation
// - Connect forms to API calls
// - Handle form state and errors
// - Ensure type safety in your forms
