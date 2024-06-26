import Button from "react-bootstrap/Button";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../../hooks/use-user";
import cartIcon from "../../img/cart.svg";
import avatar from "../../img/avatar.png";
import "./header.scss";

export function Header() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const handleClick = () => {
    setUser("");
    navigate("/");
  };

  let addClass = window.frames.location.pathname === "/" ? "hiddenBlock" : "";

  return (
    <div className="navigationPanel">
      <h4>My book store / Lidiia Tkachova</h4>
      <div className={`controlPanel ${addClass}`}>
        <Link to="/cart">
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
