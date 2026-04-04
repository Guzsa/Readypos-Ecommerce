import { HashRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ItemListContainer from "./pages/ItemListContainer";
import ItemDetailContainer from "./pages/ItemDetailContainer";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext";
import Footer from "./components/Footer";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <CartProvider>
      <HashRouter>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#0f172a' }}>
          <NavBar />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/" element={<ItemListContainer greeting="Bienvenidos a ReadyPOS" />} />
              <Route path="/category/:categoryId" element={<ItemListContainer />} />
              <Route path="/item/:itemId" element={<ItemDetailContainer />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </HashRouter>
    </CartProvider>
  );
}

export default App;