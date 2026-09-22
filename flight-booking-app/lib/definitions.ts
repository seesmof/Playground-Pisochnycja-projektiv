export type AuthFormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
        passengers?: string[]
        flightId?: string[]
      }
      message?: string
    }
  | undefined

export type BookingFormState = AuthFormState
