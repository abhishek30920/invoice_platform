import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import InvoiceActions from "./InvoiceActions";

export function InvoiceList() {
  return (
    <Table>
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
        <TableRow>
          <TableCell>
            #INV-001
          </TableCell>
          <TableCell>
        abhishek
          </TableCell>
          <TableCell>
        $55.00
          </TableCell>
          <TableCell>
        Paid
      </TableCell>
      <TableCell>
        22/11/2043
      </TableCell>
      <TableCell className="text-right">
        <InvoiceActions/>
        </TableCell>
        </TableRow>
      </TableBody>
    </Table>

  );
}