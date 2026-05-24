const products = [
  { id: 1, title: "Laptop", price: 1000, category: "Electronics" },
  { id: 2, title: "Shirt", price: 25, category: "Clothing" },
  { id: 3, title: "Headphones", price: 150, category: "Electronics" },
];

const productTitles = products.map((product) => product.title);
console.log(productTitles);

const productsWithoutOne = products.filter((product) => product.id !== 1);
console.log(productsWithoutOne);

const totalPrice = products.reduce((accumulator, product) => {
  return accumulator + product.price;
}, 0);
console.log(totalPrice);
