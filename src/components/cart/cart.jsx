import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../../hooks/use-cart";
import { useUser } from "../../hooks/use-user";
import EmptyCart from "../empty-cart/empty-cart";
import CartItem from "../cart-item/cart-item";
import "./cart.scss";

export default function Cart() {
  const { cart, setCart } = useCart();
  const { user } = useUser();
  const [currentUserCart, setCurrentUserCart] = useState(
    cart.addedBooks
      ? cart.addedBooks.filter((book) => book.customer === user)
      : []
  );

  useEffect(() => {
    setCurrentUserCart(
      cart.addedBooks.filter((book) => book.customer === user)
    );
  }, [user, cart]);

  const totalValue = currentUserCart.reduce(
    (acc, currentValue) => acc + currentValue.quantity * currentValue.price,
    0
  );

  const handleCleanCart = () => {
    setCart((prevState) => ({
      addedBooks: [
        ...prevState.addedBooks.filter((book) => book.customer !== user),
      ],
    }));
  };

  const purchaseButton = currentUserCart.length ? (
    <Button variant="dark" id="purchaseButton" onClick={handleCleanCart}>
      Purchase
    </Button>
  ) : (
    ""
  );

  const cleanCartButton = currentUserCart.length ? (
    <Button variant="dark" id="cleanCart" onClick={handleCleanCart}>
      Clean Cart
    </Button>
  ) : (
    ""
  );

  const totalValueSection = currentUserCart.length ? (
    <h5 id="totalCart">Total value, {totalValue.toFixed(2)}$</h5>
  ) : (
    ""
  );

  return (
    <div className="cart">
      <section className="purchaseAndContinueButtons">
        <Link to="/book-list">
          <Button id="continueButton">Continue shopping</Button>
        </Link>
        {purchaseButton}
      </section>
      <Container>
        <h1>Cart</h1>
        {currentUserCart.length ? (
          currentUserCart.map((book) => (
            <CartItem
              key={book.id}
              id={book.id}
              quantity={book.quantity}
              price={book.price}
              title={book.title}
              author={book.author}
              image={book.image}
              limit={book.limit}
            />
          ))
        ) : (
          <EmptyCart />
        )}
        <Row>
          <Col>{cleanCartButton}</Col>
          <Col>{totalValueSection}</Col>
        </Row>
      </Container>
    </div>
  );
}
