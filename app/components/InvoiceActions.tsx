import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { CheckCircle, DownloadCloudIcon, Mail, MoreHorizontal, Pencil, Trash } from "lucide-react";
import Link from "next/link";

export default function InvoiceActions() {
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
            href=""
            className="flex items-center px-4 py-2 hover:bg-gray-100 rounded transition-colors"
          >
            <Pencil className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm text-gray-700">Edit Invoice</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href=""
            className="flex items-center px-4 py-2 hover:bg-gray-100 rounded transition-colors"
          >
            <DownloadCloudIcon className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm text-gray-700">Download Invoice</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href=""
            className="flex items-center px-4 py-2 hover:bg-gray-100 rounded transition-colors"
          >
            <Mail className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm text-gray-700">Reminder Email</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href=""
            className="flex items-center px-4 py-2 hover:bg-gray-100 rounded transition-colors"
          >
            <Trash className="h-4 w-4 mr-2 text-red-500" />
            <span className="text-sm text-gray-700">Delete Invoice</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href=""
            className="flex items-center px-4 py-2 hover:bg-gray-100 rounded transition-colors"
          >
            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
            <span className="text-sm text-gray-700">Mark as Paid</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
