import "./footer.scss";

export default function Footer() {
  return (
    <div className="Footer">
      <footer className="footer">
        Made in{" "}
        <a
          href="https://prometheus.org.ua/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Prometheus
        </a>{" "}
        (c) 2024
      </footer>
    </div>
  );
}
