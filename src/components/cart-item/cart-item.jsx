import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, InputGroup, Form } from "react-bootstrap";
import { useCart } from "../../hooks/use-cart";
import { useUser } from "../../hooks/use-user";
import imgNotFound from "../../img/no-image.jpg";
import removeIcon from "../../img/delete-icon.png";
import "./cart-item.scss";

export default function CartItem({
  id,
  title,
  quantity,
  price,
  author,
  image,
  limit,
}) {
  const { cart, setCart } = useCart();
  const { user } = useUser();
  const [disabledPlusButton, setDisabledPlusButton] = useState("");
  const [disabledMinusButton, setDisabledMinusButton] = useState("");
  const [totalPrice, setTotalPrice] = useState((quantity * price).toFixed(2));

  const handleRemoveBook = () => {
    cart.addedBooks.filter((book, indexDelete) => {
      if (book.customer === user && book.id == id) {
        setCart((prevState) => ({
          addedBooks: [
            ...prevState.addedBooks.filter(
              (order, index) => index !== indexDelete
            ),
          ],
        }));
      }
    });
  };

  useEffect(() => {
    setTotalPrice((price * quantity).toFixed(2));
    if (quantity >= limit) {
      setDisabledPlusButton("disabled");
    } else setDisabledPlusButton("");
    if (quantity <= 1) {
      setDisabledMinusButton("disabled");
    } else setDisabledMinusButton("");
  }, [quantity]);

  const addToLocalStorage = (operation) => {
    const bookID = cart.addedBooks.findIndex((book) => book.id === id);
    setCart((prevState) => {
      const updatedCart = { ...prevState };
      updatedCart.addedBooks[bookID] = {
        ...updatedCart.addedBooks[bookID],
        quantity:
          operation === "increase"
            ? updatedCart.addedBooks[bookID].quantity + 1
            : updatedCart.addedBooks[bookID].quantity - 1,
      };
      return updatedCart;
    });
  };

  const incrementQuantity = () => {
    addToLocalStorage("increase");
  };

  const decrementQuantity = () => {
    addToLocalStorage("decrease");
  };

  return (
    <Row className="CartItem purchaseDetails">
      <Col xs={2} className="bookImageInCart">
        <Link to={`/specific-book/${id}`}>
          <img src={image ? image : imgNotFound} width={60} alt={title} />
        </Link>
      </Col>
      <Col xs={12} md={5}>
        <h6>
          <Link to={`/specific-book/${id}`}>
            {title} by {author}
          </Link>
        </h6>
      </Col>
      <Col xs={5} md={3} lg={2}>
        <InputGroup className="quantityOfBooksControl">
          <button
            type="button"
            id="minusButton"
            onClick={decrementQuantity}
            className={`selectQuantityButton ${disabledMinusButton}`}
            disabled={disabledMinusButton ? true : false}
          >
            -
          </button>
          <Form.Control
            value={quantity}
            type="number"
            className="quantityOfBooksInput"
            id="quantityOfBooksInput"
            readOnly
          />
          <button
            type="button"
            id="plusButton"
            className={`selectQuantityButton ${disabledPlusButton}`}
            onClick={incrementQuantity}
            disabled={disabledPlusButton ? true : false}
          >
            +
          </button>
        </InputGroup>
      </Col>
      <Col xs={4} md={2} id="totalPrice">
        {totalPrice} $
      </Col>
      <Col className="removeButton">
        <button onClick={handleRemoveBook}>
          <img src={removeIcon} alt="delete" width={20} />
        </button>
      </Col>
    </Row>
  );
}
