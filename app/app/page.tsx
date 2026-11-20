"use client";

import { Customer } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [customers, setCustomers] = useState<Customer[] | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      const url = "/customers.json";
      setIsLoading(true);
      const response = await fetch(url);
      const data: Customer[] = await response.json();
      setCustomers(data);
      setIsLoading(false);
    };
    fetchCustomers();
  }, []);

  return (
    <div className="min-h-screen bg-sky-50">
      <div className="mx-auto max-w-3xl">
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-3 gap-3">
          {customers ? (
            customers.map((customer, index) => (
              <div
                key={index}
                className="bg-white rounded-md outline-sky-700 p-3"
              >
                <h3 className="font-bold">{customer.name}</h3>
                <p>{customer.age} years old.</p>
                <span className="text-sky-800">{customer.email}</span>
              </div>
            ))
          ) : (
            <p>Wait for the data...</p>
          )}
        </section>
      </div>
    </div>
  );
}
