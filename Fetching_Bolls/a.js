async function main() {
  // Like the browser fetch API, the default method is GET
  const response = await fetch("/get-verses/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      {
        translation: "YLT",
        book: 19,
        chapter: 145,
        verses: [14, 15, 16],
      },
      {
        translation: "KJV",
        book: 19,
        chapter: 91,
        verses: [1, 2, 3],
      },
    ]),
  });
  const data = await response.json();
  console.log(data);
  // returns something like:
  //   {
  //   userId: 1,
  //   id: 1,
  //   title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  //   body: 'quia et suscipit\n' +
  //     'suscipit recusandae consequuntur expedita et cum\n' +
  //     'reprehenderit molestiae ut ut quas totam\n' +
  //     'nostrum rerum est autem sunt rem eveniet architecto'
  // }
}

main().catch(console.error);
