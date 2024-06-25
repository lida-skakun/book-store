import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import cartIcon from "../../img/cart.svg";
import avatar from "../../img/avatar.png";
import "./header.scss";

export default function Header({ hiddenBlock }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="navigationPanel">
      <h4>My book store / Lidiia Tkachova</h4>
      <div className={`controlPanel ${hiddenBlock}`}>
        <img src={cartIcon} alt="image 0f bucket" id="basketImage" />
        <Button variant="dark" onClick={handleClick}>
          Sing-Out
        </Button>
        <img src={avatar} alt="user image" id="userImage" />
        <span>TestUser</span>
      </div>
    </div>
  );
}
