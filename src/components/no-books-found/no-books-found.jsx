import nothingFound from "../../img/nothing-found.png";
import "./no-books-found.scss";

export default function NoBooksFound() {
  return (
    <div className="noBooksFound">
      <img src={nothingFound} />
      <h4>No books found...</h4>
    </div>
  );
}
