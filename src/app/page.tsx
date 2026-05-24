interface User {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

const API_URL = "https://jsonplaceholder.typicode.com/users";

export default async function HomePage() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok)
      throw new Error(`Failed to fetch users. Status: ${response.status}`);

    const users: User[] = await response.json();

    return (
      <div className="max-w-4xl mx-auto p-3">
        <h1 className="text-3xl font-bold mb-5 text-slate-800">Users List</h1>

        <div className="grid gap-3 md:grid-cols-2">
          {users.map((user, index) => (
            <div
              key={user.id}
              className="p-3 border rounded-xl shadow-sm bg-white"
            >
              <h2 className="text-xl font-semibold text-blue-600">
                {user.name}
              </h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-xs text-gray-400 mt-2">
                Works at: {user.company.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-3 text-center text-red-500 font-semibold">
        Failed to load users. Please try again.
      </div>
    );
  }
}
