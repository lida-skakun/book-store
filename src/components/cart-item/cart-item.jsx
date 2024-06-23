import { Row, Col } from "react-bootstrap";
import "./cart-item.scss";

export default function CartItem() {
  return (
    <Row className="CartItem purchaseDetails">
      <Col xs={2}>
        <h6>Book name</h6>
      </Col>
      <Col xs={6}>Count</Col>
      <Col xs={4} id="totalPrice">
        Total price
      </Col>
    </Row>
  );
}
