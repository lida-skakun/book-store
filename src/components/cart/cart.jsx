import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/use-cart";
import EmptyCart from "../empty-cart/empty-cart";
import CartItem from "../cart-item/cart-item";
import "./cart.scss";

export default function Cart() {
  const { cart, setCart } = useCart();
  const totalValue = cart.addedBooks.reduce(
    (acc, currentValue) => acc + currentValue.quantity * currentValue.price,
    0
  );

  const handleCleanCart = () => {
    setCart({ addedBooks: [] });
  };

  const purchaseButton = cart.addedBooks.length ? (
    <Button variant="dark" id="purchaseButton" onClick={handleCleanCart}>
      Purchase
    </Button>
  ) : (
    ""
  );

  const cleanCartButton = cart.addedBooks.length ? (
    <Button variant="dark" id="cleanCart" onClick={handleCleanCart}>
      Clean Cart
    </Button>
  ) : (
    ""
  );

  const totalValueSection = cart.addedBooks.length ? (
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
        {cart.addedBooks.length ? (
          cart.addedBooks.map((book) => (
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
