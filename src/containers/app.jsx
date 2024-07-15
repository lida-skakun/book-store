import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Layout,
  SignInPage,
  CartPage,
  BookListPage,
  SpecificBookPage,
} from "../routes/index";
import NotFoundPage from "../components/not-found-page/not-found-page";
import ScrollToTop from "../components/scroll-to-top/scroll-to-top";
import { BooksProvider } from "../hooks/use-books";
import { CartProvider } from "../hooks/use-cart";
import { LocalStorageService, LS_KEYS } from "../services/localStorage";
import { UserProvider } from "../hooks/use-user";
import defaultBooks from "../data/books.json";
import "./app.scss";

function App() {
  const [bookList, setBookList] = useState(defaultBooks.books);

  const [user, setUser] = useState(
    LocalStorageService.get(LS_KEYS.USERS) || ""
  );

  const [cart, setCart] = useState(
    LocalStorageService.get(LS_KEYS.CART) || { addedBooks: [] }
  );

  useEffect(() => {
    LocalStorageService.set(LS_KEYS.USERS, user);
  }, [user]);

  useEffect(() => {
    LocalStorageService.set(LS_KEYS.CART, cart);
  }, [cart]);

  function RequireAuth({ children }) {
    return user ? children : <Navigate to="/" />;
  }

  return (
    <div className="App">
      <UserProvider value={{ user, setUser }}>
        <BooksProvider value={{ bookList, setBookList }}>
          <CartProvider value={{ cart, setCart }}>
            <BrowserRouter basename="course-final">
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<SignInPage />} />
                  <Route
                    path="book-list"
                    element={
                      <RequireAuth>
                        <BookListPage />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="/specific-book/:id"
                    element={
                      <RequireAuth>
                        <SpecificBookPage />
                      </RequireAuth>
                    }
                  />
                  <Route
                    path="/cart"
                    element={
                      <RequireAuth>
                        <CartPage />
                      </RequireAuth>
                    }
                  />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </BooksProvider>
      </UserProvider>
    </div>
  );
}

export default App;
