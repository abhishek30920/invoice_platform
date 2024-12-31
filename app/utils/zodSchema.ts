import {z} from 'zod'
export const OnboardingSchema=z.object({
  firstName:z.string().min(2,"First Name is required").max(50),
  lastName:z.string().min(2,"Last Name is required").max(50),
  address:z.string().min(2,"Address is required").max(50)

})