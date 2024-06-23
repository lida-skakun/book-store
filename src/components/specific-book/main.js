window.onload = () => {
  setDefaultPriceAndValue();
  initialSetup();
};
const bookPrice = 43.19;
const quantityOfBooks = document.getElementById("quantityOfBooksInput");

const initialSetup = () => {
  quantityOfBooks.addEventListener("input", () => countTotalValue());
  quantityOfBooks.addEventListener("input", (event) =>
    checkQuantity(event.target.value)
  );
  document
    .getElementById("plusButton")
    .addEventListener("click", () => plusQuantity());
  document
    .getElementById("plusButton")
    .addEventListener("click", () => countTotalValue());

  document
    .getElementById("minusButton")
    .addEventListener("click", () => minusQuantity());

  document
    .getElementById("minusButton")
    .addEventListener("click", () => countTotalValue());
};

const plusQuantity = () => {
  quantityOfBooks.value = parseInt(quantityOfBooks.value) + 1;
  checkQuantity(quantityOfBooks.value);
};

const minusQuantity = () => {
  quantityOfBooks.value = parseInt(quantityOfBooks.value) - 1;
  checkQuantity(quantityOfBooks.value);
};

const showMessage = (text) => {
  let message = document.getElementById("informationMessage");
  message.classList.remove("hidden");
  message.textContent = text;
  setTimeout(() => {
    message.classList.add("hidden");
    message.textContent = "";
  }, 3000);
};

const setDefaultPriceAndValue = () => {
  const bookPriceInCartHtml = document.getElementById("bookPriceInCart");
  const bookPriceHtml = document.getElementById("bookPrice");
  bookPriceInCartHtml.textContent = bookPrice;
  bookPriceHtml.textContent = bookPrice + "$";
  countTotalValue();
};

const countTotalValue = () => {
  const totalValueOfBooks = bookPrice * parseInt(quantityOfBooks.value);
  const totalValueHtml = document.getElementById("totalValueOfBooks");
  totalValueHtml.textContent = totalValueOfBooks.toFixed(2);
};

const checkQuantity = (value) => {
  let minusButton = document.getElementById("minusButton");
  let plusButton = document.getElementById("plusButton");
  if (value > 42) {
    quantityOfBooks.value = 42;
    countTotalValue();
    plusButton.disabled = true;
    minusButton.disabled = false;
    plusButton.classList.add("disabledButton");
    minusButton.classList.remove("disabledButton");
    showMessage("The entered number cannot be more than 42 pieces.");
    quantityOfBooks.blur();
  } else if (value < 1) {
    quantityOfBooks.value = 1;
    countTotalValue();
    plusButton.disabled = false;
    minusButton.disabled = true;
    minusButton.classList.add("disabledButton");
    plusButton.classList.remove("disabledButton");
    showMessage("The entered number cannot be less than 1 piece.");
    quantityOfBooks.blur();
  } else {
    plusButton.disabled = false;
    minusButton.disabled = false;
    plusButton.classList.remove("disabledButton");
    minusButton.classList.remove("disabledButton");
    setTimeout(() => {
      quantityOfBooks.blur();
    }, 1000);
  }
};
