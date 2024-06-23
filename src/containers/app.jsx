import { Route, Routes } from "react-router-dom";
import {
  SignInPage,
  CartPage,
  BookListPage,
  SpecificBookPage,
} from "../routes/index";
import NotFoundPage from "../components/not-found-page/not-found-page";
import defaultBooks from "../books.json";
import "./app.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route
          path="book-list"
          element={<BookListPage books={defaultBooks.books} />}
        />
        <Route path="specific-book" element={<SpecificBookPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {/* <SpecificBook books={defaultBooks.books} />*/}
    </div>
  );
}

export default App;
