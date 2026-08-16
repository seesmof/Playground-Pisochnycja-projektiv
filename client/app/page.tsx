"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Item, useCart } from "@/store/cart";

export default function IndexPage() {
  const { items, add, remove, update } = useCart();

  return (
    <div className="min-h-screen flex overflow-hidden">
      <aside className="w-60 bg-gray-800 text-white p-3 h-screen fixed">
        Amen
      </aside>
      <main className="flex-1 overflow-y-auto bg-gray-100 ml-60 p-3"></main>
    </div>
  );
}
