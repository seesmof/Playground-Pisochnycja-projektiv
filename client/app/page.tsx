"use client";

export type Product = {
  name: string;
  price: number;
  quantity: number;
  makerCompany: string;
};

export const products: Product[] = [
  { name: "iPhone 15", price: 1000, quantity: 312, makerCompany: "Apple" },
  { name: "MacBook Pro", price: 3200, quantity: 12, makerCompany: "Apple" },
  { name: "Air Pods", price: 500, quantity: 250, makerCompany: "Apple" },
];

export default function IndexPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="container mx-auto px-4 py-2">
        <table className="bg-white rounded-md overflow-hidden w-full">
          <thead>
            <tr>
              <th className="text-start p-3">Name</th>
              <th className="text-start p-3">Price</th>
              <th className="text-start p-3">Quantity</th>
              <th className="text-start p-3">Company Maker</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.price}</td>
                <td className="p-3">{product.quantity}</td>
                <td className="p-3">{product.makerCompany}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
