import { useEffect, useState } from "react";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../../hooks/use-user";
import { useCart } from "../../hooks/use-cart";
import cartIcon from "../../img/cart.svg";
import avatar from "../../img/avatar.png";
import "./header.scss";

export function Header() {
  const { user, setUser } = useUser();
  const { cart } = useCart();
  const [booksInCart, setBooksInCart] = useState(0);
  const navigate = useNavigate();
  const handleClick = () => {
    setUser("");
    navigate("/");
  };

  useEffect(() => {
    let currentUserCart = cart.addedBooks.filter(
      (book) => book.customer === user
    );
    if (currentUserCart) {
      setBooksInCart(
        currentUserCart.reduce(
          (acc, currentValue) => acc + Number(currentValue.quantity),
          0
        )
      );
    } else {
      setBooksInCart(0);
    }
  }, [cart, user]);

  const quantityOfBooksInCart = booksInCart > 0 && (
    <span className="quantityOfBooksInCart">{booksInCart}</span>
  );

  return (
    <Navbar collapseOnSelect expand="lg" className="navigationPanel">
      <Container>
        <Navbar.Brand as={Link} to="/book-list">
          <h4>My book store / Lidiia Tkachova</h4>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          {window.frames.location.hash !== "#/" ||
            (window.frames.location.hash !== "" && (
              <Nav className="align-items-center">
                <Nav.Item>
                  <Nav.Link eventKey="1" as={Link} to="/cart">
                    {quantityOfBooksInCart}
                    <img
                      src={cartIcon}
                      alt="image 0f bucket"
                      id="basketImage"
                    />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Button variant="dark" onClick={handleClick}>
                    Sing-Out
                  </Button>
                </Nav.Item>
                <Nav.Item>
                  <img src={avatar} alt="user image" id="userImage" />
                  <span>{user}</span>
                </Nav.Item>
              </Nav>
            ))}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
