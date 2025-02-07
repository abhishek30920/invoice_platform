import prisma from "@/app/utils/db";
import { requireAuth } from "@/app/utils/hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import salmanbhoi from "@/public/giphy.webp";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import SubmitButton from "@/app/components/SubmitButton";
import { DeleteInvoice } from "@/app/action";

async function Authorize(invoiceId: string, userId: string) {
  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: userId
    }
  });
  if (!data) {
    return redirect("/dashboard/invoices");
  }
}

type Params = Promise<{ invoiceId: string }>;

export default async function DeleteInvoiceRoute({ params }: { params: Params }) {
  const session = await requireAuth();
  const { invoiceId } = await params; // Now params is a promise that you can await
  await Authorize(invoiceId, session.user?.id as string);
  
  return (
    <div className="flex flex-1 justify-center items-center h-full">
      <Card className="max-w-[500px]">
        <CardHeader>
          <CardTitle>Delete Invoice</CardTitle>
          <CardDescription>
            Are you sure you want to delete this invoice? This action cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image src={salmanbhoi} alt="Delete Invoice" />
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Link className={buttonVariants({ variant: "outline" })} href={`/dashboard/invoices`}>
            Cancel
          </Link>
          <form action={async () => {
            "use server";
            await DeleteInvoice(invoiceId);
          }}>
            <SubmitButton variant={"destructive"} text="Delete">
              Delete
            </SubmitButton>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
