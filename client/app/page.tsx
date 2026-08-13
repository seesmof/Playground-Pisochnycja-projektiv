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
      <main className="flex-1 overflow-y-auto bg-gray-100 ml-60 p-3">
        <div className="mb-4">
          <Button
            onClick={() => {
              const newItem: Item = {
                id: crypto.randomUUID(),
                name: "iPhone 15 Pro",
                price: 1000,
              };
              add(newItem);
              console.log(newItem.id);
            }}
          >
            Add
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell className="space-x-3">
                  <Dialog>
                    <DialogTrigger
                      render={<Button variant="ghost">Edit</Button>}
                    />
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit the item</DialogTitle>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                  <Button variant="destructive" onClick={() => remove(item.id)}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}
