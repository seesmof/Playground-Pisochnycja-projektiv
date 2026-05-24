export interface User {
  id: number;
  name: string;
}

const fetchUser = (): Promise<User> => {
  return new Promise((resolve, reject) => {
    let success = true;
    if (success) resolve({ id: 1, name: "Oleh" });
    else {
      reject("Could not find user data.");
    }
  });
};

fetchUser()
  .then((user) => console.log(`Success: ${user.name}`))
  .catch((error) => console.error(`Error: ${error}`));
