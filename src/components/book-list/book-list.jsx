import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { useBooks } from "../../hooks/use-books";
import BookItem from "../book-item/book-item";
import searchItem from "../../img/search-icon.png";
import NoBooksFound from "../no-books-found/no-books-found";
import "./book-list.scss";

export default function BookList() {
  const { bookList } = useBooks();
  const [filterValue, setFilterValue] = useState("");
  const [priceRanking, setPriceRanking] = useState({ min: 0, max: 9999 });
  const [filteredBooks, setFilteredBooks] = useState(bookList);

  useEffect(() => {
    setFilteredBooks(
      filterValue
        ? bookList.filter(
            (book) =>
              book.title.toLowerCase().includes(filterValue) &&
              book.price > priceRanking.min &&
              book.price < priceRanking.max
          )
        : bookList.filter(
            (book) =>
              book.price > priceRanking.min && book.price < priceRanking.max
          )
    );
  }, [priceRanking, filterValue]);

  const handleSearch = ({ target: { value } }) => {
    setFilterValue(value.toLowerCase());
  };

  const selectBookPrice = ({ target: { value } }) => {
    if (value === "1") {
      setPriceRanking({ min: 0, max: 9999 });
    } else if (value === "2") {
      setPriceRanking({ min: 0, max: 14.99 });
    } else if (value === "3") {
      setPriceRanking({ min: 15, max: 29.99 });
    } else if (value === "4") {
      setPriceRanking({ min: 30, max: 9999 });
    }
  };

  return (
    <>
      <Container>
        <Row id="filterPanel">
          <Col sm={12} md={6}>
            <InputGroup className="searchSection" size="lg">
              <Form.Control
                placeholder="Search by book name"
                aria-label="Search by book name"
                aria-describedby="basic-addon1"
                className="form-control"
                onChange={handleSearch}
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
          <Col sm={6} md={4}>
            <select
              className="form-select form-select-lg mb-3"
              aria-label="book price selector"
              onChange={selectBookPrice}
            >
              <option value="1">Price All</option>
              <option value="2">cheaper than 15$</option>
              <option value="3">from 15$ to 30$</option>
              <option value="4">30$ and more</option>
            </select>
          </Col>
        </Row>
        <Row>
          {filteredBooks.length == 0 ? (
            <NoBooksFound />
          ) : (
            filteredBooks.map((col) => (
              <Col md={12} lg={6} xl={4} key={col.id}>
                <BookItem
                  id={col.id}
                  title={col.title}
                  author={col.author}
                  price={col.price}
                  image={col.image}
                  level={col.level}
                  tags={col.tags}
                />
              </Col>
            ))
          )}
        </Row>
      </Container>
    </>
  );
}
