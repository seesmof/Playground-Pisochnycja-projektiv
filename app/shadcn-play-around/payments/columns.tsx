"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <Badge
          variant="default"
          className={`${
            status === "success"
              ? "bg-green-600 text-green-50 font-medium"
              : status === "failed"
              ? "bg-red-600 text-red-50 font-medium"
              : status === "processing"
              ? "bg-yellow-500 text-yellow-50 font-medium"
              : status === "pending"
              ? "bg-blue-600 text-blue-50 font-medium"
              : ""
          }`}
        >
          {row.getValue("status")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];
