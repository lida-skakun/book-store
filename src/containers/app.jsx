import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import {
  SignInPage,
  CartPage,
  BookListPage,
  SpecificBookPage,
} from "../routes/index";
import NotFoundPage from "../components/not-found-page/not-found-page";
import { ItemsProvider } from "../hooks/use-items";
import defaultBooks from "../books.json";
import "./app.scss";

function App() {
  const [items, setItems] = useState(defaultBooks.books);
  const [filterValue, setFilterValue] = useState("");

  //useEffect(() => {LocalStorageService.set(LS_KEYS.TASKS, items)}, [items])
  return (
    <div className="App">
      <ItemsProvider
        value={{
          items,
          setItems: (i) => setItems(i),
          filterValue,
          setFilterValue: (f) => setFilterValue(f),
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="book-list" element={<BookListPage />} />
            <Route path="specific-book" element={<SpecificBookPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          {/* <SpecificBook books={defaultBooks.books} />*/}
        </BrowserRouter>
      </ItemsProvider>
    </div>
  );
}

export default App;
