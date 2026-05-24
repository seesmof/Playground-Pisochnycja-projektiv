const fetchUser = () => {
  return new Promise((resolve, reject) => {
    let success = true;
    if (success) resolve({ id: 1, name: "Oleh" });
    else reject("Could not fetch user data.");
  });
};

const getUserData = async () => {
  try {
    const user = await fetchUser();
    console.log(`Success: ${user.name}`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

getUserData();
