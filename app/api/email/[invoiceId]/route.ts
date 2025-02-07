import prisma from "@/app/utils/db";
import { requireAuth } from "@/app/utils/hooks";
import { emailClient } from "@/app/utils/mailTrap";
import { NextResponse } from "next/server";



export async function POST(request:Request,{ params }: { params: Promise<{ invoiceId: string }> }){
    try{
      console.log("here")
      const session = await requireAuth()
const {invoiceId}=await params;
    console.log(invoiceId)
      const invoiceData=await prisma.invoice.findUnique({
        where:{
          id:invoiceId,
          userId:session.user?.id
        }
      })
     
    if(!invoiceData ){
      return  NextResponse.json({error:"Invoice not found"},{status:404})
    }
    console.log(invoiceData)
    const sender={
      email:"hello@demomailtrap.com",
      name:"Abhishek"
    }
    emailClient.send({
      from :sender,
      to:[{email:"abhishek309200@gmail.com"}],
      subject:"Reminder Invoice Payment",
      text:`Hi ${invoiceData.clientName},\n\nThis is a reminder that your invoice ${invoiceData.invoiceName} is due on ${invoiceData.dueDate}. Please make the payment as soon as possible.\n\nThanks,\n${invoiceData.fromName}`
      
      
    })
    return NextResponse.json({success:true,message:"Email sent successfully"})
    }
    catch(error){
      console.log(error)
        return NextResponse.json({error:"Something went wrong"},{status:500})
    }
}