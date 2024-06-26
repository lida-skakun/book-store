import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../../hooks/use-user";
import cartIcon from "../../img/cart.svg";
import avatar from "../../img/avatar.png";
import "./header.scss";

export function Header() {
  const { user } = useUser();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  let addClass = window.frames.location.pathname === "/" ? "hiddenBlock" : "";

  return (
    <div className="navigationPanel">
      <h4>My book store / Lidiia Tkachova</h4>
      <div className={`controlPanel ${addClass}`}>
        <img src={cartIcon} alt="image 0f bucket" id="basketImage" />
        <Button variant="dark" onClick={handleClick}>
          Sing-Out
        </Button>
        <img src={avatar} alt="user image" id="userImage" />
        <span>{user}</span>
      </div>
    </div>
  );
}
