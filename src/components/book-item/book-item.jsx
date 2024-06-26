import { Col, Button } from "react-bootstrap";
import imgNotFound from "../../img/no-image.jpg";
import "./book-item.scss";

export default function BookItem({ title, author, price, image }) {
  const checkTitle = () => {};
  return (
    <Col className="bookCard mb-5">
      <ul className="bookInformation">
        <li>
          {image ? (
            <img src={image} alt={title} />
          ) : (
            <img src={imgNotFound} alt={title} />
          )}
        </li>
        <li>
          <strong>
            {title.length > 40 ? title.slice(0, 40) + "..." : title}
          </strong>
        </li>
        <li>{author.length > 40 ? author.slice(0, 40) + "..." : author}</li>
        <li className="priceAndView">
          {price}$<Button variant="dark">View</Button>
        </li>
      </ul>
    </Col>
  );
}
