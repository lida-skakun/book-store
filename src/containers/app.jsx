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
import { ItemsProvider } from "../hooks/use-items";
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

  const [cartItems, setCartItems] = useState(
    LocalStorageService.get(LS_KEYS.CART) || {}
  );
  {
    /* useEffect(() => {
    const getDatas = async () => {
      const response = await fetch("../data/books.json");
      const data = await response.json();
      setBookList(data);
    };
    getDatas();
  }, []);
  */
  }
  useEffect(() => {
    LocalStorageService.set(LS_KEYS.USERS, user);
    LocalStorageService.set(LS_KEYS.CART, cartItems);
  }, [user, cartItems]);

  function RequireAuth({ children }) {
    return user ? children : <Navigate to="/" />;
  }

  return (
    <div className="App">
      <UserProvider value={{ user, setUser }}>
        <CartProvider value={{ cartItems, setCartItems }}>
          <ItemsProvider value={{ bookList, setBookList }}>
            <BrowserRouter>
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
          </ItemsProvider>
        </CartProvider>
      </UserProvider>
    </div>
  );
}

export default App;
