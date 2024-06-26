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
import { LocalStorageService, LS_KEYS } from "../services/localStorage";
import { UserProvider } from "../hooks/use-user";
import defaultBooks from "../data/books.json";
import "./app.scss";

function App() {
  const [items, setItems] = useState(defaultBooks.books);
  const [user, setUser] = useState(
    LocalStorageService.get(LS_KEYS.USERS) || ""
  );

  useEffect(() => {
    LocalStorageService.set(LS_KEYS.USER, user);
  }, [user]);

  function RequireAuth({ children }) {
    return user ? children : <Navigate to="/" />;
  }

  return (
    <div className="App">
      <UserProvider value={{ user, setUser }}>
        <ItemsProvider value={{ items, setItems }}>
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
                  path="specific-book"
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
      </UserProvider>
    </div>
  );
}

export default App;
