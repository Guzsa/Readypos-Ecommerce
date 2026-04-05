import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { CartContext } from "../context/CartContext";

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const { itemId } = useParams();
  const { addItem } = useContext(CartContext);

  useEffect(() => {
    setLoading(true);
    const docRef = doc(db, "items", itemId);

    getDoc(docRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setProduct({ id: snapshot.id, ...snapshot.data() });
        }
      })
      .catch(error => console.error("Error al traer el detalle:", error))
      .finally(() => setLoading(false));
  }, [itemId]);

  const handleOnAdd = () => {
    addItem(product, 1);
    setAdded(true);
  };

  if (loading) return <h2 className="text-white text-center mt-5">Cargando ReadyPOS...</h2>;
  if (!product) return <h2 className="text-white text-center mt-5">El producto no existe.</h2>;

  return (
    <div className="container py-5" style={{ minHeight: '100vh', color: 'white' }}>
      
      {/* Botón Volver */}
      <div className="row mb-4">
        <div className="col">
          <Link to="/" className="text-decoration-none" style={{ color: '#38bdf8', fontSize: '1.1rem' }}>
            ← Volver al catálogo
          </Link>
        </div>
      </div>

      {/* Card Principal */}
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="card border-0 shadow-lg" style={{ background: '#1e293b', borderRadius: '15px', border: '1px solid #38bdf8' }}>
            <div className="row g-0 align-items-center">
              
              {/* Columna Imagen (arriba en mobile, izquierda en PC) */}
              <div className="col-12 col-md-5 p-4 text-center">
                <div className="bg-white rounded-3 p-3 shadow-sm d-flex align-items-center justify-content-center" style={{ minHeight: '300px' }}>
                  <img 
                    src={product.img || "https://via.placeholder.com/350"} 
                    alt={product.name} 
                    className="img-fluid" 
                    style={{ maxHeight: '350px', objectFit: 'contain' }} 
                  />
                </div>
              </div>

              {/* Columna Información (abajo en mobile, derecha en PC) */}
              <div className="col-12 col-md-7">
                <div className="card-body p-4 p-lg-5 text-white">
                  <h1 className="fw-bold mb-2" style={{ color: '#38bdf8', fontSize: 'calc(1.5rem + 1.5vw)' }}>
                    {product.name}
                  </h1>
                  
                  <p className="text-uppercase small mb-4" style={{ color: '#94a3b8', letterSpacing: '1px' }}>
                    Categoría: {product.category}
                  </p>
                  
                  <p className="fs-5 opacity-75 mb-4" style={{ lineHeight: '1.6' }}>
                    {product.description || "Este producto es esencial para la gestión eficiente de tu punto de venta."}
                  </p>

                  <div className="p-4 rounded-3 shadow-inner" style={{ background: '#0f172a' }}>
                    <div className="row align-items-center g-3">
                      <div className="col-12 col-sm-6">
                        <h2 className="fw-bold mb-1" style={{ fontSize: '2rem' }}>${product.price}</h2>
                        <p className="mb-0 fw-bold" style={{ color: product.stock > 0 ? '#4ade80' : '#f87171' }}>
                          {product.stock > 0 ? `Stock: ${product.stock} unidades` : 'Sin stock'}
                        </p>
                      </div>
                      
                      <div className="col-12 col-sm-6 text-sm-end">
                        {!added ? (
                          <button 
                            onClick={handleOnAdd}
                            disabled={product.stock <= 0}
                            className="btn fw-bold w-100"
                            style={{ 
                              background: product.stock > 0 ? '#38bdf8' : '#475569', 
                              color: '#0f172a',
                              padding: '12px 25px'
                            }}
                          >
                            {product.stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
                          </button>
                        ) : (
                          <Link 
                            to="/cart" 
                            className="btn btn-success fw-bold w-100"
                            style={{ padding: '12px 25px', background: '#4ade80', color: '#0f172a' }}
                          >
                            Terminar Compra
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailContainer;