import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import BookItem from "../book-item/book-item";
import searchItem from "../../img/search-icon.png";
import "./book-list.scss";

export default function BookList({ books }) {
  const groupBooks = (books, groupSize) => {
    const groups = [];
    for (let i = 0; i < books.length; i += groupSize) {
      groups.push(books.slice(i, i + groupSize));
    }
    return groups;
  };

  const groupedBooks = groupBooks(books, 3);

  return (
    <>
      <Container>
        <Row id="searchPanel">
          <Col xs={5}>
            <InputGroup size="lg">
              <Form.Control
                placeholder="Search by book name"
                aria-label="Search by book name"
                aria-describedby="basic-addon1"
                className="form-control"
              />
              <InputGroup.Text className="searchButton">
                <img
                  src={searchItem}
                  alt="search icon"
                  className="searchIcon"
                />
              </InputGroup.Text>
            </InputGroup>
          </Col>

          <div className="col-3">
            <select
              className="form-select form-select-lg mb-3"
              aria-label="book price selector"
            >
              <option value="1">Price All</option>
              <option value="2">cheaper than 15$</option>
              <option value="3">from 15$ to 30$</option>
              <option value="4">30$ and more</option>
            </select>
          </div>
        </Row>
        {groupedBooks.map((group, groupIndex) => (
          <Row key={groupIndex}>
            {group.map((book) => (
              <Col key={book.id}>
                <BookItem
                  title={book.title}
                  author={book.author}
                  price={book.price}
                  image={book.image}
                />
              </Col>
            ))}
          </Row>
        ))}
      </Container>
    </>
  );
}
