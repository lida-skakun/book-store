import cartIcon from "../../img/cart.svg";

export default function EmptyCart() {
  return (
    <>
      <section className="emptyCart">
        <img src={cartIcon} className="img-fluid" alt="empty cart" />
        <h4>Cart empty...</h4>
      </section>
    </>
  );
}
