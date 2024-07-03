import { Button, Container, Row, Col } from "react-bootstrap";
import CartItem from "../cart-item/cart-item";
import cartIcon from "../../img/cart.svg";
import "./cart.scss";

export default function Cart() {
  return (
    <div className="Cart">
      <section className="purchaseButton">
        <Button variant="dark" id="purchaseButton">
          Purchase
        </Button>
      </section>
      <section className="emptyCart">
        <img src={cartIcon} className="img-fluid" alt="empty cart" />
        <p>Cart empty...</p>
      </section>
      <Container>
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <h5 id="totalCart">Total price, $</h5>
        <button>Очистити кошик!</button>
      </Container>
    </div>
  );
}
