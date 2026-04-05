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

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '80vh', color: 'white' }}>
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
    <div className="container py-4">
      {/* BANNER PRINCIPAL */}
      {!categoryId && (
        <div className="p-5 mb-4 rounded-3 text-white text-center" 
             style={{ background: 'linear-gradient(135deg, #1e293b 0%, #38bdf8 100%)' }}>
          <h1 className="display-4 fw-bold">ReadyPOS</h1>
          <p className="fs-5">Tu aliado en insumos y tecnología comercial.</p>
        </div>
      )}

      <h2 className="text-center mb-4" style={{ color: '#38bdf8' }}>
        {categoryId ? `Categoría: ${categoryId.toUpperCase()}` : greeting}
      </h2>
      
      {/* GRILLA RESPONSIVE */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {products.length === 0 ? (
          <div className="col-12 text-center text-white">
            <p>No se encontraron productos en esta categoría.</p>
          </div>
        ) : (
          products.map(p => (
            <div key={p.id} className="col">
              <div className="card h-100 border-0 shadow-sm" style={{ background: '#1e293b', border: '1px solid #38bdf8 !important' }}>
                
                <div className="p-3 bg-white m-2 rounded">
                  <img 
                    src={p.img || "https://via.placeholder.com/150"} 
                    alt={p.name} 
                    className="card-img-top"
                    style={{ height: '150px', objectFit: 'contain' }} 
                  />
                </div>
                
                <div className="card-body d-flex flex-column text-center text-white">
                  <h5 className="card-title fs-6 fw-bold" style={{ height: '50px', overflow: 'hidden' }}>
                    {p.name}
                  </h5>
                  <p className="fs-4 fw-bold" style={{ color: '#38bdf8' }}>
                    ${p.price}
                  </p>
                  
                  <Link 
                    to={`/item/${p.id}`} 
                    className="btn mt-auto fw-bold"
                    style={{ background: '#38bdf8', color: '#0f172a' }}
                  >
                    Ver Detalle
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ItemListContainer;