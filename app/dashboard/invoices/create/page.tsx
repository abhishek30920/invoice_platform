import InvoiceCreate from "@/app/components/InvoiceCreate";
import prisma from "@/app/utils/db";
import { requireAuth } from "@/app/utils/hooks";


async function getUserData(userId:string){

  const data=await prisma.user.findUnique({
    where:{
      id:userId,
    },
    select:{
      firstName:true,
      lastName:true,
      address:true,
      email:true,
    }
  })
  return data
}
export default async function InvoiceCreatePage() {
  const session = await requireAuth()
  const data=await getUserData(session.user?.id as string)


  return (
    <div>

      <InvoiceCreate lastName={data?.lastName as string} address={data?.address as string} email={data?.email as string} firstName={data?.firstName as string}/>
    </div>
  );
}