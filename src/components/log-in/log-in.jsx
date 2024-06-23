import { useNavigate } from "react-router-dom";
import avatar from "../../img/avatar.png";
import "./log-in.scss";

export default function LogIn() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("book-list");
  };
  return (
    <>
      <div className="signInCard">
        <div className="signInForm">
          <img src={avatar} alt="user avatar" className="avatar" />
          <form action="post">
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              autoComplete="on"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              id="userName"
            />
            <button
              type="submit"
              className="btn"
              id="signInButton"
              onClick={handleClick}
            >
              Sign-In
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
