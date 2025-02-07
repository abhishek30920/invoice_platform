import { EditInvoiceComponent } from "@/app/components/editInvoice";
import prisma from "@/app/utils/db";
import { requireAuth } from "@/app/utils/hooks";
import { notFound } from "next/navigation";


async function getData(invoiceId:string,userId:string){
  const data =await prisma.invoice.findUnique({
    where:{
      id:invoiceId,
      userId:userId
    }, 
  })

if(!data){
  return notFound()
}
return data;


}

type Params=Promise<{invoiceId:string}>

export default async function EditInvoice({params}: { params: Params }) {
  const {invoiceId}=await params;
  const session = await requireAuth()
  const data=await getData(invoiceId,session.user?.id as string)

  console.log(data)
    return <EditInvoiceComponent data={data}/>
  
} 