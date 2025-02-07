"use server"

import { requireAuth } from "./utils/hooks"
import { parseWithZod } from "@conform-to/zod"
import { invoiceSchema, OnboardingSchema } from "./utils/zodSchema"
import prisma from "./utils/db"
import { redirect } from "next/navigation"
import { emailClient } from "./utils/mailTrap"
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
function fomatCurrency(amount:number,currency:string){
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(amount)
}

export async function CreateInvoice(prevState:unknown,formData:FormData){

  console.log("Action received formData:", Object.fromEntries(formData))
  console.log("Action received formData:", Object.fromEntries(formData))
  console.log("in the action")
  console.log(formData)
  const session = await requireAuth()
  
  const submission=parseWithZod(formData,{
    schema:invoiceSchema
  })
  console.log("here=====================")
  console.log(submission)
console.log(submission)
  if(submission.status!=="success"){
    return submission.reply()
  }

  const data=await prisma.invoice.create({
    data:{
        clientAddress:submission.value.clientAddress,
        clientEmail:submission.value.clientEmail,
        clientName:submission.value.clientName,
        currency:submission.value.currency,
        date:submission.value.date,
        dueDate:submission.value.dueDate,
        fromAddress:submission.value.fromAddress,
        fromEmail:submission.value.fromEmail,
        fromName:submission.value.fromName,
        invoiceItemDescription:submission.value.invoiceItemDescription,
        invoiceItemQuantity:submission.value.invoiceItemQuantity,
        invoiceItemRate:submission.value.invoiceItemRate,
        invoiceName:submission.value.invoiceName,
        invoiceNumber:submission.value.invoiceNumber,
        note:submission.value.note,
        status:submission.value.status,
        total:submission.value.total,
        userId:session.user?.id

    
    }
  })


  const sender={
    email:"hello@demomailtrap.com",
    name:"Abhishek"
  }
  emailClient.send({
    from :sender,
    to:[{email:"abhishek309200@gmail.com"}],
    template_uuid: "0791434e-90ab-40e5-9007-55e004503116",
    template_variables: {
      "clientName": submission.value.clientName,
      "invoiceNumber": submission.value.invoiceNumber,
      "invoiceDate": submission.value.date,
      "dueDate": submission.value.dueDate,
      "totalAmount": fomatCurrency(submission.value.total,submission.value.currency),
      "invoiceLink":`https://invoice-platform-xi.vercel.app/${data.id}`
    }
  })
return redirect("/dashboard/invoices")
}

export async function UpdateInvoice(prevState:unknown,formData:FormData){
   const session=await requireAuth()
    const submission=parseWithZod(formData,{
      schema:invoiceSchema
    })
    if(submission.status!=="success"){
      return submission.reply()
    }

    const data=await prisma.invoice.update({
      where:{
        id:formData.get("id") as string,
        userId:session.user?.id
      },
      data:{
        clientAddress:submission.value.clientAddress,
        clientEmail:submission.value.clientEmail,
        clientName:submission.value.clientName,
        currency:submission.value.currency,
        date:submission.value.date,
        dueDate:submission.value.dueDate,
        fromAddress:submission.value.fromAddress,
        fromEmail:submission.value.fromEmail,
        fromName:submission.value.fromName,
        invoiceItemDescription:submission.value.invoiceItemDescription,
        invoiceItemQuantity:submission.value.invoiceItemQuantity,
        invoiceItemRate:submission.value.invoiceItemRate,
        invoiceName:submission.value.invoiceName,
        invoiceNumber:submission.value.invoiceNumber,
        note:submission.value.note,
        status:submission.value.status,
        total:submission.value.total,
        
      }
      
})

const sender={
  email:"hello@demomailtrap.com",
  name:"Abhishek"
}
emailClient.send({
  from :sender,
  to:[{email:"abhishek309200@gmail.com"}],
  template_uuid: "9e6e3bea-7f2f-4578-b029-51b4d2fe3076",
  template_variables: {
    "clientName": submission.value.clientName,
    "invoiceNumber": submission.value.invoiceNumber,
    "invoiceDate": submission.value.date,
    "dueDate": submission.value.dueDate,
    "totalAmount": fomatCurrency(submission.value.total,submission.value.currency),
    "invoiceLink":`https://invoice-platform-xi.vercel.app/${data.id}`
  }
})
return redirect("/dashboard/invoices")
}

export async function DeleteInvoice(invoiceId:string){
  const session=await requireAuth()

  const data=await prisma.invoice.delete({
    where:{
      userId:session.user?.id,
      id:invoiceId
    }
  })

  return redirect("/dashboard/invoices")
}

export async function MarkasPaid(invoiceId:string){
  const session=await requireAuth()

  const data=await prisma.invoice.update({
    where:{
      userId:session.user?.id,
      id:invoiceId
    },
    data:{
      status:"PAID"
    }
  })

  return redirect("/dashboard/invoices")
}