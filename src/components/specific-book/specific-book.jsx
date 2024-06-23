import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import "./specific-book.scss";

export default function SpecificBook({ books }) {
  return (
    <>
      <Container className="mt-5 mb-5">
        <Row>
          <Col xs={4}>
            <Carousel fade data-bs-theme="dark" className="carouselImage">
              <Carousel.Item>
                <img src={books[0].image} />
              </Carousel.Item>
              <Carousel.Item>
                <img src={books[4].image} />
              </Carousel.Item>
              <Carousel.Item>
                <img src={books[5].image} />
              </Carousel.Item>
            </Carousel>
          </Col>
          <Col xs={4} className="aboutBookPanel">
            <h4>Book name, book author</h4>
            <ul>
              <li>
                <b>Book name: </b>
                <span>KKKKKK kkkkkk</span>
              </li>
              <li>
                <b>Book author: </b>
                <span>KKKKdKK kkkkkk</span>
              </li>
              <li>
                <b>Book level: </b>
                <span>KKKKKK kkkkkk</span>
              </li>
              <li>
                <b>Book tags: </b>
                <span>KKKKKK kkkkkk</span>
              </li>
            </ul>
            <p id="bookPrice">78.67$</p>
          </Col>
          <Col xs={4}>
            <Card id="purchasePanel">
              <h5>Purchase details</h5>
              <hr />
              <ul>
                <li>
                  <span>Price, $</span>
                  <span id="bookPriceInCart"></span>
                </li>
                <li>
                  <span className="countQuantity">Count, pc</span>
                  <InputGroup className="quantityOfBooksControl">
                    <button
                      className="selectQuantityButton disabledButton"
                      type="button"
                      id="minusButton"
                      disabled
                    >
                      -
                    </button>
                    <Form.Control
                      aria-label="Amount (to the nearest dollar)"
                      value={1}
                      type="number"
                      className="quantityOfBooksInput"
                      id="quantityOfBooksInput"
                    />
                    <button
                      className="selectQuantityButton"
                      type="button"
                      id="plusButton"
                    >
                      +
                    </button>
                  </InputGroup>
                </li>
                <li>
                  <span>Total price, $</span>
                  <span id="totalValueOfBooks"></span>
                </li>
                <p
                  id="informationMessage"
                  className="informationMessage hidden"
                >
                  The entered number cannot be less than 1 piece.
                </p>
              </ul>
              <Button variant="dark" className="addToCartButton">
                Add to cart
              </Button>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs={8} className="bookDescription mt-5 p-5">
            <h5>Description:</h5>
            <p>
              A book providing an introduction to thr JavaScript language and
              programming in general Lorem ipsum dolor, sit amet consectetur
              adipisicing elit. Est dolorem laborum, illum consectetur provident
              harum nostrum officia minima cum laudantium a ratione et! Dolorum,
              expedita quibusdam. Ducimus ea explicabo eligendi.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
