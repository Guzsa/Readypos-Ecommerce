import { HashRouter, Routes, Route } from "react-router-dom"; // Cambiamos a HashRouter
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import NavBar from "./components/NavBar";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <HashRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/category/:categoryId" element={<ItemListContainer />} />
          <li path="/item/:itemId" element={<ItemDetailContainer />} />
        </Routes>
      </HashRouter>
    </CartProvider>
  );
}

export default App;