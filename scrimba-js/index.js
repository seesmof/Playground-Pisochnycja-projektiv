let count = 0;

const countElement = document.querySelector("#count");
const minusButton = document.querySelector("#minus");
const plusButton = document.querySelector("#plug");

const updateCount = () => {
  countElement.innerHTML = count;
};

minusButton.addEventListener("click", () => {
  console.log("Minus");
  count--;
  updateCount();
});

plusButton.addEventListener("click", () => {
  count++;
  updateCount();
});
