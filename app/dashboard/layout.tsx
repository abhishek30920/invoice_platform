import React from "react";
import { requireAuth } from "../utils/hooks";
import Link from "next/link";

import Bill from "@/public/bill.png"
import Image from 'next/image';
import { DashboardLinks } from "../components/DashBoardLinks";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, User2 } from "lucide-react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { signOut } from "../utils/auth";
import prisma from "../utils/db";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";

async function getUser(userId:string){
  const data=await prisma.user.findUnique({
    where:{
      id:userId
    },
    select:{
      firstName:true,
      lastName:true,
      address:true
    }
  })
  if(!data?.firstName || !data?.lastName || !data?.address){
    redirect("/onboarding")
  }
}


export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await requireAuth()
  const data=await getUser(session.user?.id as string)
  return (
    <>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[250px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex flex-col max-h-screen h-full gap-2">
            <div className="h-14 flex items-center border-b px-5 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2">
                <Image src={Bill} className="size-7" alt="logo" />
                <p className="text-2xl font-bold">
                  Invoice <span className="text-blue-400 text-primary">App</span>
                </p>
              </Link>

            </div>
            <div className="flex-1 overflow-y-auto">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <DashboardLinks />
              </nav>
            </div>

          </div>
        </div>
        <div>
          <div className="flex flex-col">
            <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <nav className="grid gap-2 mt-10"><DashboardLinks /></nav>
                </SheetContent>
              </Sheet>
              <div className="flex items-center gap-4 ml-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="rounded-full" variant="outline" size="icon">
                      <User2/>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                     <DropdownMenuLabel>My Account</DropdownMenuLabel>
                     <DropdownMenuSeparator/>
                     <DropdownMenuItem asChild>
                            <Link href="/dashboard">DashBoard</Link>
                     </DropdownMenuItem>
                     <DropdownMenuItem asChild>
                            <Link href="/dashboard/invoices">Invoices</Link>
                     </DropdownMenuItem>
                     <DropdownMenuSeparator/>
                     <DropdownMenuItem asChild>
                      <form className="w-full" action={async () => {
                        "use server"
                        await signOut()
                      }}>
                        <Button className="w-full" type="submit">Sign Out</Button>
                      </form>
                     </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                </div>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 lg:p-6 lg:gap-6">
              {children}
            </main>
          </div>
        </div>
      </div>
<Toaster richColors closeButton/>

    </>
  );
}