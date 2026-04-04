import { useState, useEffect, useContext } from "react"; // 1. Agregamos useContext
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { CartContext } from "../context/CartContext"; // 2. Importamos tu contexto

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false); // Estado para saber si ya se agregó
  const { itemId } = useParams();

  // 3. Traemos la función addItem de tu Context
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

  // 4. Función para manejar el click del botón
  const handleOnAdd = () => {
    // Usamos una cantidad fija de 1 por ahora, o podrías sumarle un contador
    addItem(product, 1);
    setAdded(true);
  };

  if (loading) return <h2 style={{color: 'white', textAlign: 'center', marginTop: '50px'}}>Cargando ReadyPOS...</h2>;
  if (!product) return <h2 style={{color: 'white', textAlign: 'center', marginTop: '50px'}}>El producto no existe.</h2>;

  return (
    <div style={{ padding: '50px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', background: '#0f172a', minHeight: '100vh' }}>
      
      <Link to="/" style={{ alignSelf: 'flex-start', color: '#38bdf8', textDecoration: 'none', marginBottom: '30px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        ← Volver al catálogo
      </Link>

      <div style={{ display: 'flex', gap: '40px', background: '#1e293b', padding: '40px', borderRadius: '15px', border: '1px solid #38bdf8', maxWidth: '1000px', width: '100%', alignItems: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
        
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '1' }}>
          <img src={product.img || "https://via.placeholder.com/350"} alt={product.name} style={{ width: '100%', maxHeight: '350px', objectFit: 'contain' }} />
        </div>
        
        <div style={{ textAlign: 'left', flex: '1.5' }}>
          <h1 style={{ color: '#38bdf8', fontSize: '2.8rem', marginBottom: '10px', lineHeight: '1.2' }}>{product.name}</h1>
          <p style={{ fontSize: '1rem', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '30px' }}>Categoría: {product.category}</p>
          <p style={{ fontSize: '1.2rem', margin: '20px 0', lineHeight: '1.6', opacity: '0.9' }}>{product.description || "Este producto es esencial para la gestión eficiente de tu punto de venta."}</p>
          
          <div style={{ background: '#0f172a', padding: '20px', borderRadius: '10px', marginTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '5px' }}>Precio: ${product.price}</h2>
              <p style={{ color: product.stock > 0 ? '#4ade80' : '#f87171', fontWeight: 'bold', fontSize: '1.1rem' }}>
                {product.stock > 0 ? `Stock disponible: ${product.stock} unidades` : 'Sin stock'}
              </p>
            </div>
            
            {/* 5. Lógica de cambio de botón */}
            {!added ? (
              <button 
                onClick={handleOnAdd}
                disabled={product.stock <= 0}
                style={{ 
                  background: product.stock > 0 ? '#38bdf8' : '#475569', 
                  border: 'none', 
                  padding: '15px 40px', 
                  borderRadius: '5px', 
                  color: '#0f172a',
                  fontWeight: 'bold', 
                  cursor: product.stock > 0 ? 'pointer' : 'not-allowed',
                  fontSize: '1.2rem'
                }}
              >
                {product.stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
              </button>
            ) : (
              <Link 
                to="/cart" 
                style={{ 
                  background: '#4ade80', 
                  padding: '15px 40px', 
                  borderRadius: '5px', 
                  color: '#0f172a',
                  fontWeight: 'bold', 
                  textDecoration: 'none',
                  fontSize: '1.2rem'
                }}
              >
                Terminar Compra
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailContainer;