import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Graph } from "./Graph";
import prisma from "../utils/db";
import { requireAuth } from "../utils/hooks";

async function getInvoices(userId:string){
  const rawData=await prisma.invoice.findMany({
    where:{
      status:'PAID',
      userId:userId,
      createdAt:{
        lte:new Date(),
        gte:new Date(Date.now()-30*24*60*60*1000)
      }
    },
    select:{
      total:true,
      createdAt:true
    },
    orderBy:{
      createdAt:"asc"
    }
  })

  // aggregating

  const aggregatedData = rawData.reduce((acc: { [key: string]: number }, curr) => {
    const date = curr.createdAt.toLocaleDateString("en-US", { day: "numeric", month: "short" });
    acc[date] = (acc[date] || 0) + curr.total;
    return acc;
  }, {});
  
  const transformData = Object.entries(aggregatedData)
    .map(([date, amount]) => ({
      date,
      amount,
      OriginalDate: new Date(`${date}, ${new Date().getFullYear()}`), // Properly construct OriginalDate
    }))
    .sort((a, b) => a.OriginalDate.getTime() - b.OriginalDate.getTime()) // Sort by OriginalDate
    .map(({ date, amount }) => ({
      date,
      amount,
    })); // Map back to required fields
  
  
  return transformData;
  
  }


export async function InvoiceGraph(){
  const session=await requireAuth()
  const data=await getInvoices( session?.user?.id as string)
  console.log(data)
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Paid Invoices</CardTitle>
        <CardDescription>
          Invoices which have been Paid
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Graph data={data}/>
      </CardContent>
    </Card>
  )
}