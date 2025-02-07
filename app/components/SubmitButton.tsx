
"use client"
import { Button } from "@/components/ui/button"
import { useFormStatus } from "react-dom"
import { Loader2 } from "lucide-react"
interface SubmitButtonProps {
  text: string,
  variant?: 
  |"default"
  |"destructive"
  |"secondary"
  |"outline"
  |"ghost"
  |"link"
  |null
  |undefined,
  children?: React.ReactNode;
}



export default function SubmitButton({ text,variant }: SubmitButtonProps) {
  const { pending } = useFormStatus()
  console.log('Pending:', pending);

  console.log(FormData)
  console.log("ckiccllll")


  // useFormStatus is a hook that returns the status of the form
  return (
    <>
      {pending ? <Button disabled type="submit"
      ><Loader2 className="animate-spin w-full" />Please wait...</Button> : 
      <Button type="submit" variant={variant}  className= "rounded-md w-full " >{text}</Button>}
    </>


  )
}