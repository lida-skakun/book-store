import { Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import imgNotFound from "../../img/no-image.jpg";
import "./book-item.scss";

export default function BookItem({ id, title, author, price, image }) {
  return (
    <Col className="bookCard mb-5">
      <ul className="bookInformation">
        <li>
          <Link to={`/specific-book/${id}`}>
            <img
              src={image ? image : imgNotFound}
              alt={title}
              className="img-fluid"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = imgNotFound;
              }}
            />
          </Link>
        </li>
        <li>
          <strong>
            {title.length > 35 ? title.slice(0, 32) + "..." : title}
          </strong>
        </li>
        <li>{author.length > 35 ? author.slice(0, 32) + "..." : author}</li>
        <li className="priceAndView">
          {price}$
          <Link to={`/specific-book/${id}`}>
            <Button variant="dark">View</Button>
          </Link>
        </li>
      </ul>
    </Col>
  );
}
