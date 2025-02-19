import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import InvoiceActions from "./InvoiceActions";
import prisma from "../utils/db";
import { requireAuth } from "../utils/hooks";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "./EmptyState";

async function getData(userId:string){
  const data=await prisma.invoice.findMany({
    where:{
      userId:userId
    },
    select:{
      id:true,
      clientName:true,
      total:true,
      status:true,
      invoiceNumber:true,
      createdAt:true,
      currency:true
    },
    orderBy:{
      createdAt:"desc"
    }
  })

  return data
}


export async function InvoiceList() {
  function formatCurrency(amount:number,currency:string){
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(amount)
  }
  const session = await requireAuth()
  const data=await getData(session?.user?.id as string) 
  return (
    <>
    {data.length==0?(
<EmptyState title="No Invoices founded" description="Create your first invoice now"  buttonText="Create Invoice" href="/dashboard/invoices/create"/>
    ):(<Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            Invoice ID
          </TableHead>
          <TableHead>
            Customer
          </TableHead>
          <TableHead>
            Amount
          </TableHead>
          <TableHead>
            Status
          </TableHead>
          <TableHead>
            Date
          </TableHead>
          <TableHead className="text-right">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
  
          {data.map((invoice) => (
            <TableRow key={invoice.id}>
             <TableCell>{invoice.invoiceNumber}</TableCell>
              <TableCell>{invoice.clientName}</TableCell>
              <TableCell>{formatCurrency(invoice.total,invoice.currency)}</TableCell>
            <TableCell><Badge>{invoice.status}</Badge></TableCell>
            <TableCell>{new Date(invoice.createdAt).toLocaleDateString()}</TableCell>
            <TableCell className="text-right">
              <InvoiceActions id={invoice.id} status={invoice.status} />
            </TableCell>
             
            </TableRow>
          ))}
       
      </TableBody>
    </Table>)}
    </>
    

  );
}