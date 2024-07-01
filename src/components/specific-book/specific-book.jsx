import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { useItems } from "../../hooks/use-items";
import "./specific-book.scss";

export default function SpecificBook() {
  const { id } = useParams();
  const books = useItems().bookList;
  const selectedBook = books.find((book) => book.id == id);

  return (
    <>
      <Container className="mt-5 mb-5">
        <Row>
          <Col xs={4}>
            <Carousel fade data-bs-theme="dark" className="carouselImage">
              <Carousel.Item>
                <img src={selectedBook.image} />
              </Carousel.Item>
              <Carousel.Item>
                <img src={selectedBook.image} />
              </Carousel.Item>
              <Carousel.Item>
                <img src={selectedBook.image} />
              </Carousel.Item>
            </Carousel>
          </Col>
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
                <b>Book tags:</b>
                <span>{` ${selectedBook.tags}`}</span>
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
            <p>{selectedBook.description}</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
