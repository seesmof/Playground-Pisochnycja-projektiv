const getTodoItem = async () => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1",
    );

    if (!response.ok) throw new Error(`HTTP Error! Status ${response.status}`);

    const data = await response.json();

    console.log(`Here is our data: ${data.title}`);
  } catch (error) {
    console.error(`Something went wrong: ${error.message}`);
  }
};

getTodoItem();
