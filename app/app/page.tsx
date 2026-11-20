import { Customer } from "@/lib/types";

export default async function Page() {
  const response = await fetch("/customers");
  const customers: Customer[] = await response.json();

  return (
    <div className="min-h-screen bg-sky-50 p-3 flex items-center justify-center">
      <div className="mx-auto max-w-3xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {customers.map((customer, index) => (
          <div className="bg-white outline-sky-700 outline-2" key={index}>
            <h3 className="font-bold">{customer.name}</h3>
            <p>{customer.age} years old.</p>
            <p>{customer.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
