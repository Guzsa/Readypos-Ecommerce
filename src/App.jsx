import { HashRouter, Routes, Route } from "react-router-dom"; 
import ItemListContainer from "./pages/ItemListContainer";
import ItemDetailContainer from "./pages/ItemDetailContainer";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login"; // Importamos la nueva página de Login
import NavBar from "./components/NavBar";
import Footer from "./components/Footer"; 
import { CartProvider } from "./context/CartContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx"; // Importamos el AuthProvider

function App() {
  return (
    /* El AuthProvider debe envolver todo para manejar la sesión del usuario */
    <AuthProvider>
      <CartProvider>
        <HashRouter>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            
            <NavBar />
            
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<ItemListContainer />} />
                <Route path="/category/:categoryId" element={<ItemListContainer />} />
                <Route path="/item/:itemId" element={<ItemDetailContainer />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                {/* Agregamos la ruta para el Login */}
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<div className="container mt-5 text-white"><h2>Página no encontrada</h2></div>} />
              </Routes>
            </main>

            <Footer /> 
            
          </div>
        </HashRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;