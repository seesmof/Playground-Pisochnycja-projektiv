const API_URL = "https://jsonplaceholder.typicode.com/users";

const fetchUsers = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok)
      throw new Error(`Failed to fetch users. ${response.status}`);

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.error(`Failed to fetch users: ${error.message}`);
  }
};

fetchUsers();
