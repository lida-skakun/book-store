import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { useBooks } from "../../hooks/use-books";
import { useCart } from "../../hooks/use-cart";
import imgNotFound from "../../img/no-image.jpg";
import itemInCart from "../../img/itemInCart.png";
import "./specific-book.scss";

export default function SpecificBook() {
  const { id } = useParams();
  const { cart, setCart } = useCart();
  const books = useBooks().bookList;
  const selectedBook = books.find((book) => book.id == id);
  const [totalPrice, setTotalPrice] = useState(selectedBook.price);
  const [disabledPlusButton, setDisabledPlusButton] = useState("");
  const [disabledMinusButton, setDisabledMinusButton] = useState("");
  const [informationMessage, setInformationMessage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [purchasedBook, setPurchasedBook] = useState(
    cart.addedBooks.find((book) => book.id == selectedBook.id) ? true : false
  );

  useEffect(() => {
    setTotalPrice((selectedBook.price * quantity).toFixed(2));
    if (quantity >= selectedBook.amount) {
      setDisabledPlusButton("disabled");
      showMessage(`Only ${selectedBook.amount} books available`);
    } else setDisabledPlusButton("");
    if (quantity <= 1) {
      setDisabledMinusButton("disabled");
    } else setDisabledMinusButton("");
  }, [quantity]);

  const incrementQuantity = () => setQuantity((prevCount) => prevCount + 1);
  const decrementQuantity = () => setQuantity((prevCount) => prevCount - 1);

  const showMessage = (text) => {
    setInformationMessage(text);
    setTimeout(() => {
      setInformationMessage("");
    }, 3000);
  };

  const addToCart = () => {
    setCart((prevState) => {
      const currentAddedBooks = Array.isArray(prevState.addedBooks)
        ? prevState.addedBooks
        : [];
      const updatedCart = {
        ...prevState,
        addedBooks: [
          ...currentAddedBooks,
          {
            id: selectedBook.id,
            quantity: quantity,
            title: selectedBook.title,
            price: selectedBook.price,
            shortDescription: selectedBook.shortDescription,
            image: selectedBook.image,
            author: selectedBook.author,
          },
        ],
      };
      return updatedCart;
    });
  };

  const changeQuantityManual = ({ target }) => {
    if (target.value === "") {
      setQuantity("");
    } else if (target.value < 1) {
      setQuantity(1);
      showMessage("Sorry, minimum quantity of books is 1");
    } else if (target.value > 42) {
      setQuantity(42);
    } else {
      setQuantity(target.value);
    }

    setTimeout(() => {
      target.blur();
    }, 1000);
  };

  const handleInputBlur = ({ target: { value } }) => {
    value === "" && setQuantity(1);
  };

  const tags = selectedBook.tags.map((tag) => (
    <span key={tag}>{tag.charAt(0).toUpperCase() + tag.slice(1)}, </span>
  ));

  const bookImage = selectedBook.image ? (
    <Carousel data-bs-theme="dark" className="carouselImage">
      {Array.from({ length: 3 }).map((_, i) => (
        <Carousel.Item key={i}>
          <img src={selectedBook.image} alt={selectedBook.title} />
        </Carousel.Item>
      ))}
    </Carousel>
  ) : (
    <img src={imgNotFound} alt="No image" className="noImageFound" />
  );

  const buttonPurchase = (
    <Button
      variant="dark"
      className="addToCartButton"
      onClick={() => {
        addToCart();
      }}
    >
      Add to cart
    </Button>
  );

  useEffect(() => {
    cart.addedBooks.find((book) => book.id == selectedBook.id)
      ? setPurchasedBook(true)
      : setPurchasedBook(false);
  }, [cart]);

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col xs={4}>{bookImage}</Col>
          <Col xs={4} className="aboutBookPanel">
            <h4>
              {selectedBook.title}, {selectedBook.author}
            </h4>
            <ul>
              <li>
                <b>Book name: </b>
                <span>{selectedBook.title}</span>
              </li>
              <li>
                <b>Book author: </b>
                <span>{selectedBook.author}</span>
              </li>
              <li>
                <b>Book level: </b>
                <span>{` ${selectedBook.level}`}</span>
              </li>
              <li>
                <b>Book tags: </b>
                {tags}
              </li>
            </ul>
            <p id="bookPrice">{selectedBook.price}$</p>
          </Col>
          <Col xs={4}>
            <Card id="purchasePanel">
              <h5>Purchase details</h5>
              <hr />
              <ul>
                <li>
                  <span>Price, $</span>
                  <span id="bookPriceInCart">{selectedBook.price}</span>
                </li>
                <li>
                  <span className="countQuantity">Count, pc</span>
                  <InputGroup className="quantityOfBooksControl">
                    <button
                      className={`selectQuantityButton ${disabledMinusButton}`}
                      type="button"
                      id="minusButton"
                      onClick={decrementQuantity}
                      disabled={disabledMinusButton ? true : false}
                    >
                      -
                    </button>
                    <Form.Control
                      aria-label="Amount (to the nearest dollar)"
                      value={quantity}
                      onChange={changeQuantityManual}
                      onBlur={handleInputBlur}
                      type="number"
                      className="quantityOfBooksInput"
                      id="quantityOfBooksInput"
                    />
                    <button
                      className={`selectQuantityButton ${disabledPlusButton}`}
                      type="button"
                      id="plusButton"
                      onClick={incrementQuantity}
                      disabled={disabledPlusButton ? true : false}
                    >
                      +
                    </button>
                  </InputGroup>
                </li>
                <li>
                  <span>Total price, $</span>
                  <span id="totalValueOfBooks">{totalPrice}</span>
                </li>
                <p
                  id="informationMessage"
                  className={
                    informationMessage ? "informationMessage" : "hidden"
                  }
                >
                  {informationMessage}
                </p>
              </ul>
              {purchasedBook ? (
                <p className="inCart">
                  <img src={itemInCart} width={40} />
                  <Link to="/cart">Added to cart</Link>
                </p>
              ) : (
                buttonPurchase
              )}
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs={8} className="bookDescription p-5 mb-5 mt-5">
            <h5>Description:</h5>
            <p>{selectedBook.description}</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
