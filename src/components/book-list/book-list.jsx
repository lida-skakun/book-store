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

  const groupBooks = (filteredBooks, groupSize) => {
    const groups = [];
    for (let i = 0; i < filteredBooks.length; i += groupSize) {
      groups.push(filteredBooks.slice(i, i + groupSize));
    }
    return groups;
  };

  const groupedBooks = groupBooks(filteredBooks, 3);

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
          <Col xs={5}>
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

          <div className="col-3">
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
          </div>
        </Row>
        {filteredBooks.length == 0 ? (
          <NoBooksFound />
        ) : (
          groupedBooks.map((group, groupIndex) => (
            <Row key={groupIndex}>
              {group.map((book) => (
                <Col xs={4} key={book.id}>
                  <BookItem
                    id={book.id}
                    title={book.title}
                    author={book.author}
                    price={book.price}
                    image={book.image}
                    level={book.level}
                    tags={book.tags}
                  />
                </Col>
              ))}
            </Row>
          ))
        )}
      </Container>
    </>
  );
}
