"use client";

import { useEffect, useState } from "react";

const apiUrl = "https://bible-api.com/";

interface Api {
  reference: string;
  text: string;
}

export default function Page() {
  const [data, setData] = useState<Api | any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}John 3:16`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(`ERROR: Failed to fetch data: ${error}`);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-sky-50 min-h-screen p-3 flex items-center justify-center">
      <div className="bg-white rounded-md shadow p-3">
        {data ? (
          <ul>
            {data.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </div>
  );
}
