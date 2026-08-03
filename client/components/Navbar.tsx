import { CartItem } from "@/app/page";
import Link from "next/link";

export default function Navbar({ cartItems }: { cartItems: CartItem[] }) {
  return (
    <nav className="outline outline-sky-600 bg-white">
      <div className="max-w-md mx-auto p-3 flex justify-between">
        <Link className="hover:underline underline-offset-4" href={"/"}>
          Shopper
        </Link>
        <Link href={"/cart"}>Cart has {cartItems.length} items</Link>
      </div>
    </nav>
  );
}
