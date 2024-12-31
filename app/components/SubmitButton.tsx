"use client"

import { Button } from "@/components/ui/button"
import { useFormStatus } from "react-dom"
import { Loader2 } from "lucide-react"
interface SubmitButtonProps {
  text:string
}
export default function SubmitButton({text}:SubmitButtonProps) {
  const { pending } = useFormStatus()
  console.log(pending)  // useFormStatus is a hook that returns the status of the form
  return (
    <>
    {pending ?<Button disabled 
     ><Loader2 className="animate-spin"/>Please wait...</Button>:<Button  type="submit" className="bg-black text-white rounded-md w-full">{text}</Button>}
    </>

      
  )
}