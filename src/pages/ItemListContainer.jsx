import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/firebaseConfig"; 

const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    const itemCollection = collection(db, "items");

    const q = categoryId 
      ? query(itemCollection, where("category", "==", categoryId))
      : itemCollection;

    getDocs(q)
      .then((snapshot) => {
        const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(docs);
      })
      .catch(error => console.error("Error en Firebase:", error))
      .finally(() => setLoading(false));
  }, [categoryId]);

  // --- NUEVA VISTA DE CARGA CON SPINNER ---
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '80vh', 
        background: '#0f172a',
        color: 'white'
      }}>
        {/* CSS INLINE PARA EL SPINNER */}
        <style>{`
          .spinner {
            border: 4px solid rgba(255, 255, 255, 0.1);
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border-left-color: #38bdf8;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <div className="spinner"></div>
        <h2 style={{ color: '#38bdf8', marginTop: '20px' }}>Cargando ReadyPOS...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center', color: 'white', background: '#0f172a', minHeight: '100vh' }}>
      
      {!categoryId && (
        <div style={{ 
          background: 'linear-gradient(135deg, #1e293b 0%, #38bdf8 100%)', 
          padding: '50px 20px', 
          borderRadius: '15px', 
          marginBottom: '40px' 
        }}>
          <h1>ReadyPOS</h1>
          <p>Tu aliado en insumos y tecnología comercial.</p>
        </div>
      )}

      <h2 style={{ marginBottom: '30px', color: '#38bdf8' }}>
        {categoryId ? `Categoría: ${categoryId.toUpperCase()}` : greeting}
      </h2>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        {products.length === 0 ? (
          <p>No se encontraron productos en esta categoría.</p>
        ) : (
          products.map(p => (
            <div key={p.id} style={{ border: '1px solid #38bdf8', padding: '15px', borderRadius: '10px', width: '250px', background: '#1e293b' }}>
              
              <img 
                src={p.img || "https://via.placeholder.com/150"} 
                alt={p.name} 
                style={{ width: '100%', height: '150px', objectFit: 'contain', marginBottom: '15px', borderRadius: '5px', background: 'white' }} 
              />
              
              <h3 style={{ fontSize: '1rem', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {p.name}
              </h3>

              <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '15px 0', color: '#38bdf8' }}>
                ${p.price}
              </p>
              
              <Link 
                to={`/item/${p.id}`} 
                style={{ 
                  display: 'block',
                  background: '#38bdf8', 
                  padding: '10px', 
                  borderRadius: '5px', 
                  color: '#0f172a', 
                  fontWeight: 'bold', 
                  textDecoration: 'none', 
                  cursor: 'pointer', 
                  width: '92%',
                  margin: '0 auto'
                }}
              >
                Ver Detalle
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ItemListContainer;