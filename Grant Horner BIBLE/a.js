var BooksDataUrl = "https://bolls.life/get-books/YLT/";
fetch(BooksDataUrl)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
