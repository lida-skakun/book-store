import BookList from "../components/book-list/book-list";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";

export function BookListPage({ books }) {
  return (
    <>
      <Header />
      <BookList books={books} />
      <Footer />
    </>
  );
}
