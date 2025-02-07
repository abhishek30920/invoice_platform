import Link from "next/link";
import logo from "@/public/bill.png"
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
export function NavBar(){
  return(
    <div className="flex items-center justify-between py-5">
      <Link href="/" className="flex items-center gap-2 ">
      <Image src={logo} alt="logo" className="size-10" />
      <h3 className="text-3xl font-semibold">Invoice <span className="text-blue-500">App</span></h3>
      </Link>
      <Link href="/login" className={buttonVariants()}>Get Started</Link>
    </div>
  )
}