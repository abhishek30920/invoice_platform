import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import prisma from "../utils/db";
import { requireAuth } from "@/app/utils/hooks";

async function getData(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      clientName: true,
      clientEmail: true,
      total: true,
      currency: true, // Include currency if it's part of the schema
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 7, // limit
  });
  return data;
}

export async function RecentInvoices() {
  const session = await requireAuth();
  const data = await getData(session?.user?.id as string);

  function formatCurrency(amount: number, currency: string) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Invoices</CardTitle>
      </CardHeader>
      <CardContent>
        {data.map((invoice: any) => (
          <div
            className="flex items-center gap-4 border-b border-gray-200 py-3"
            key={invoice.id}
          >
            <Avatar className="flex h-9 w-9 items-center justify-center bg-gray-300 text-sm font-medium rounded-full">
              <AvatarFallback>{invoice.clientName.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium leading-none">
                {invoice.clientName}
              </p>
              <p className="text-sm text-gray-500">{invoice.clientEmail}</p>
            </div>
            <div className="ml-auto">
              <p className="text-sm font-semibold text-green-500">
                {formatCurrency(invoice.total, invoice.currency || "USD")}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
