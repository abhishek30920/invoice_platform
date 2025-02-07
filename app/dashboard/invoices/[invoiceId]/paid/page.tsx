import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Moneyguy from "@/public/giphy-monet.webp"
import Link from "next/link";
import SubmitButton from "@/app/components/SubmitButton";
import { MarkasPaid } from "@/app/action";
import prisma from "@/app/utils/db";
import { redirect } from "next/navigation";
import { requireAuth } from "@/app/utils/hooks";

type Params=Promise<{invoiceId:string}>


async function Authorize( invoiceId:string, userId:string){
  const data = await prisma.invoice.findUnique({
    where:{
      id:invoiceId,
      userId:userId
    }
  })
  if(!data){
    return redirect("/dashboard/invoices")
  }
}

export default async function Paid( {params}:{ params:Params } ) { 
  const {invoiceId}=await params
  const session=await requireAuth()
  await Authorize(invoiceId,session.user?.id as string)
  return (
    <div className="flex flex-1 justify-center items-center">
      <Card className="max-w-[500px]">
        <CardHeader>
          <CardTitle>Mark as Paid?</CardTitle>
          <CardDescription>
            Are you sure you want to mark this invoice as paid?
          </CardDescription>

        </CardHeader>
        <CardContent>
          <Image src={Moneyguy} alt="money guy"/>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Link href={`/dashboard/invoices`} className="btn btn-outline">Cancel</Link>
          <form action={async()=>{
            "use server"
            await MarkasPaid(invoiceId)
          }}>
            <SubmitButton variant="secondary" text="Mark as Paid" />
     </form>
         
      </CardFooter>
      </Card>
    </div>
  )
}