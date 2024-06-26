import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/use-user";
import avatar from "../../img/avatar.png";
import "./log-in.scss";

export default function LogIn() {
  const [login, setLogin] = useState("");
  const [correctLogin, setUnCorrectLoginClass] = useState("hiddenBlock");
  const { user, setUser } = useUser();

  const navigate = useNavigate();

  const handleEntering = () => {
    if (login.length > 3 && login.length < 17) {
      setUser(login);
      navigate("book-list");
    } else {
      setUnCorrectLoginClass("correctLogin");
    }
  };

  const handleLoginValueChange = ({ target: { value } }) => {
    setUnCorrectLoginClass("hiddenBlock");
    setLogin(value);
  };

  const handleKeyDown = ({ key }) => {
    if (key === "Enter") {
      handleEntering();
    }
  };

  return (
    <>
      <main className="signInCard">
        <div className="signInForm">
          <img src={avatar} alt="user avatar" className="avatar" />
          <form action="post">
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              autoComplete="on"
              className={`form-control ${correctLogin}`}
              placeholder="Username"
              aria-label="Username"
              id="userName"
              value={login}
              onChange={handleLoginValueChange}
              onKeyDown={handleKeyDown}
              onBlur={handleLoginValueChange}
            />
            <span className={`${correctLogin}`}>
              Please, enter valid username
            </span>
            <button
              type="submit"
              className="btn"
              id="signInButton"
              onClick={handleEntering}
              disabled={login.length < 4 || login.length > 16}
            >
              Sign-In
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
