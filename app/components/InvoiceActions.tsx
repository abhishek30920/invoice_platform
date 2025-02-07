'use client'
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { CheckCircle, DownloadCloudIcon, Mail, MoreHorizontal, Pencil, Target, Trash } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
interface iAPPprops{
  id:string,
  status:string
}
export default function InvoiceActions({id,status}:iAPPprops) {
  const handleSendReminder = async () => {  
    toast.promise(fetch(`/api/email/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }),{
      loading:"Sending reminder email ...",
      success:"Email sent successfully",
      error:"Failed to send email"

    }
  )
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="secondary"
          className="ml-2 p-2 hover:bg-gray-100 border border-gray-300 shadow-sm rounded-full"
        >
          <MoreHorizontal className="h-5 w-5 text-gray-600" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 bg-white shadow-lg rounded-lg border border-gray-200"
      >
        <DropdownMenuItem asChild>
          <Link
            href={`/dashboard/invoices/${id}`}
            className="flex items-center px-4 py-2 hover:bg-gray-100 rounded transition-colors"
          >
            <Pencil className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm text-gray-700">Edit Invoice</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={`/api/invoice/${id}`} target="_blank"
            className="flex items-center px-4 py-2 hover:bg-gray-100 rounded transition-colors"
          >
            <DownloadCloudIcon className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm text-gray-700">Download Invoice</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSendReminder} className="px-4">
      
            
            <Mail className="h-4 w-4 mr-2 text-gray-500" />Reminder Email
      
       
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={`/dashboard/invoices/${id}/delete`}
            className="flex items-center px-4 py-2 hover:bg-gray-100 rounded transition-colors"
          >
            <Trash className="h-4 w-4 mr-2 text-red-500" />
            <span className="text-sm text-gray-700">Delete Invoice</span>
          </Link>
        </DropdownMenuItem>
          {status !== "PAID" && (
                    <DropdownMenuItem asChild>

            <Link

            href={`/dashboard/invoices/${id}/paid`}
            className="flex items-center px-4 py-2 hover:bg-gray-100 rounded transition-colors"
          >
            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
            <span className="text-sm text-gray-700">Mark as Paid</span>
          </Link>
          </DropdownMenuItem>
          )}
        
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
