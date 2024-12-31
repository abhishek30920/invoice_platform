'use client'
import { HomeIcon, Users2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Use this hook for server components

export const dashboardLinks = [
  {
    id: 0,
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    id: 1,
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: Users2,
  },
];

export function DashboardLinks() {
  const pathname = usePathname(); // Get the current path to determine the active link

  return (
    <div className="flex flex-col space-y-2">
      {dashboardLinks.map((link) => (
        <Link
          key={link.id}
          href={link.href}
          className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium 
          ${
            pathname === link.href
              ? "bg-blue-500 text-white" // Active link styling
              : "hover:bg-gray-100 text-gray-700" // Default hover styling
          }`}
        >
          <link.icon className="w-5 h-5" />
          <span>{link.name}</span>
        </Link>
      ))}
    </div>
  );
}
