import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { useBooks } from "../../hooks/use-books";
import BookItem from "../book-item/book-item";
import searchItem from "../../img/search-icon.png";
import "./book-list.scss";

export default function BookList() {
  const { bookList } = useBooks();
  const [filterValue, setFilterValue] = useState("");
  const filteredBooks = !filterValue
    ? bookList
    : bookList.filter((item) => item.title.toLowerCase().includes(filterValue));

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
        ))}
      </Container>
    </>
  );
}
