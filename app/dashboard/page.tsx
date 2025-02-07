

import { Suspense } from "react"
import { DashboardBlocks } from "../components/DashBoardBlocks"
import { EmptyState } from "../components/EmptyState"
import { InvoiceGraph } from "../components/InvoiceGraph"
import { RecentInvoices } from "../components/recentInvoices"
import prisma from "../utils/db"
import { requireAuth } from "../utils/hooks"
import { Skeleton } from "@/components/ui/skeleton"


async function getData(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId
    },
    select: {
      id: true,
    }
  })

  return data
}

export default async function Dashboard() {
  const session = await requireAuth()
  const data = await getData(session?.user?.id as string)
  return (
    <>
      {data.length < 1 ? (<><EmptyState title="No Invoice found" description="Create an invoice to see it right here" buttonText="Create Invoice" href="/dashboard/invoices/create" /></>) : (

        <Suspense fallback={<Skeleton className="w-full h-full" />}>
      <DashboardBlocks />
          <div className="grid gap-4  lg:grid-cols-3 md:gap-8">

            <InvoiceGraph />

            <RecentInvoices />
            
            </div>
          </Suspense>
            )}


    </>)


}
