"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(`Failed to fetch data: ${error}`);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-5 font-sans">
      <h1>Users Management (React & SQLite)</h1>

      <form></form>
    </div>
  );
}
