"use server"

import { requireAuth } from "./utils/hooks"
import { parseWithZod } from "@conform-to/zod"
import { OnboardingSchema } from "./utils/zodSchema"
import prisma from "./utils/db"
import { redirect } from "next/navigation"
export async function OnboardUser(prevState:any,formData: FormData) {
  const session = await requireAuth()
  const submission = parseWithZod(formData,
    {
      schema: OnboardingSchema
    }
  )

  if (submission.status !== "success") {
    return submission.reply()
  }

  const data = await prisma.user.update({
    where: {
      id: session.user?.id
    },
    data: {
      firstName: submission.value.firstName,
      lastName: submission.value.lastName,
      address: submission.value.address
    }
  })
  return redirect("/dashboard")
}


export async function CreateInvoice(){
  const session = await requireAuth()
 
  

}