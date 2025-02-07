import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CreditCard, DollarSign, IndianRupee, Users } from "lucide-react";
import prisma from "../utils/db";
import { requireAuth } from "../utils/hooks";

async function getData(userId:string){
 const [data,openInvoices, paidinvoices] =await Promise.all([
    prisma.invoice.findMany({
      where:{
        userId:userId
      },
      select:{
        total:true,
      }
    }),
    prisma.invoice.findMany({
      where:{
        userId:userId,
        status:"PENDING"
      },
      select:{
         id:true
      }
     
    }),
    prisma.invoice.findMany({
      where:{
        userId:userId,
        status:"PAID"
      },select:{
        id:true
      }
     
    })

 ])
 console.log(data,openInvoices,paidinvoices)
 return {
  data,openInvoices,paidinvoices
 }
}


export async function DashboardBlocks() {
  const  session=await requireAuth()
  const {data,openInvoices,paidinvoices}=await getData(session?.user?.id as string)
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-2xl font-bold">Total Revenue</CardTitle>
          <IndianRupee className="size-4 text-muted-foreground "/>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${data.reduce((acc,invoice)=>acc+invoice.total,0)}</div>
          <p className="text-sm text-muted-foreground">Based on Total Volume</p>


        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Total invoice issued</CardTitle>
          <Users className="size-4 text-muted-foreground "/>
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">+{data.length}</h2>
          <p className="text-xs text-muted-foreground">Total Invoices isse</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Paid Invoices</CardTitle>
          <CreditCard className="size-4 text-muted-foreground "/>
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">+{paidinvoices.length}</h2>
          <p className="text-xs text-muted-foreground">Total invoice which have been paid!</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Pending Invoices</CardTitle>
          <Activity className="size-4 text-muted-foreground "/>
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">+{openInvoices.length}</h2>
          <p className="text-xs text-muted-foreground">Invoices which Have not paid!!</p>
        </CardContent>
      </Card>

    </div>
  )

}