import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
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

  let addClass = window.frames.location.pathname === "/" ? "hiddenBlock" : "";

  const quantityOfBooksInCart = booksInCart > 0 && (
    <span className="quantityOfBooksInCart">{booksInCart}</span>
  );

  return (
    <div className="navigationPanel">
      <h4>My book store / Lidiia Tkachova</h4>
      <div className={`controlPanel ${addClass}`}>
        <Link to="/cart" className="linkToBasket">
          {quantityOfBooksInCart}
          <img src={cartIcon} alt="image 0f bucket" id="basketImage" />
        </Link>
        <Button variant="dark" onClick={handleClick}>
          Sing-Out
        </Button>
        <img src={avatar} alt="user image" id="userImage" />
        <span>{user}</span>
      </div>
    </div>
  );
}
