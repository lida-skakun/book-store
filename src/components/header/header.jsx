import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import cartIcon from "../../img/cart.svg";
import avatar from "../../img/avatar.png";
import "./header.scss";

export default function Header() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <Row className="Header navigationPanel">
      <Col className="align-content-center">
        <span>Name of the store / Lidiia Tkachova</span>
      </Col>
      <Col className="controlPanel">
        <img src={cartIcon} alt="image 0f bucket" id="basketImage" />
        <Button variant="dark" onClick={handleClick}>
          Sing-Out
        </Button>
        <img src={avatar} alt="user image" id="userImage" />
        <span>TestUser</span>
      </Col>
    </Row>
  );
}
