import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { db } from "../services/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Link } from "react-router-dom";

const Checkout = () => {
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { cart, totalPrecio, clearCart } = useContext(CartContext);

  const [buyer, setBuyer] = useState({
    name: "",
    phone: "",
    email: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("");

  const handleInputChange = (e) => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!paymentMethod) {
      alert("Por favor, seleccioná un medio de pago.");
      return;
    }

    // 1. DISPARAMOS EL LOADING
    setLoading(true);

    const order = {
      buyer,
      items: cart,
      total: totalPrecio,
      paymentMethod, 
      date: serverTimestamp(),
      status: "generada"
    };

    try {
      // 2. ENVIAMOS A FIREBASE
      const docRef = await addDoc(collection(db, "orders"), order);
      
      // Simulamos un pequeño delay de 1.5s para que el usuario VEA que se procesó (opcional pero pro)
      setTimeout(() => {
        setOrderId(docRef.id);
        clearCart();
        setLoading(false);
      }, 1500);

    } catch (error) {
      console.error("Error al generar la orden:", error);
      setLoading(false);
    }
  };

  // --- EL ORDEN DE ESTOS "IF" ES CRÍTICO ---
  
  // PRIMERO: Si está cargando, mostramos SI O SI el spinner
  if (loading) {
    return (
      <div style={msgContainerStyle}>
        <style>{`
          .spinner-checkout {
            border: 4px solid rgba(255, 255, 255, 0.1);
            width: 60px;
            height: 60px;
            border-radius: 50%;
            border-left-color: #38bdf8;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <div className="spinner-checkout"></div>
        <h2 style={{ color: '#38bdf8' }}>Procesando tu pedido... 🚀</h2>
        <p style={{ opacity: 0.7 }}>Estamos conectando con ReadyPOS</p>
      </div>
    );
  }

  // SEGUNDO: Si ya terminó y tenemos ID, mostramos éxito
  if (orderId) {
    return (
      <div style={msgContainerStyle}>
        <h1 style={{ color: '#4ade80' }}>¡Compra Exitosa! 🎉</h1>
        <p style={{ fontSize: '1.2rem', margin: '20px 0' }}>Tu número de seguimiento es: <strong style={{color: '#38bdf8'}}>{orderId}</strong></p>
        <Link to="/" style={btnBackStyle}>Volver al Inicio</Link>
      </div>
    );
  }

  // TERCERO: Si no está cargando ni terminó, mostramos el formulario
  return (
    <div style={{ padding: '60px 20px', color: 'white', background: '#0f172a', minHeight: '80vh', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ color: '#38bdf8', textAlign: 'center', marginBottom: '40px' }}>Finalizar Compra</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <h3>1. Datos de Envío/Contacto</h3>
          <input type="text" name="name" placeholder="Nombre completo" required onChange={handleInputChange} style={inputStyle} />
          <input type="tel" name="phone" placeholder="Teléfono" required onChange={handleInputChange} style={inputStyle} />
          <input type="email" name="email" placeholder="Email de contacto" required onChange={handleInputChange} style={inputStyle} />
          
          <button type="submit" style={btnSubmitStyle}>Confirmar y Pagar</button>
        </form>

        <div style={{ background: '#1e293b', padding: '30px', borderRadius: '15px', border: '1px solid #38bdf8' }}>
          <h3 style={{ color: '#38bdf8', marginBottom: '20px' }}>2. Elegí tu Medio de Pago</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {["Tarjeta", "Transferencia", "MercadoPago", "Efectivo"].map((method) => (
              <label key={method} style={radioContainerStyle}>
                <input type="radio" name="payment" value={method} onChange={(e) => setPaymentMethod(e.target.value)} />
                <span>{method === "Tarjeta" ? "💳 Tarjeta" : method === "Transferencia" ? "🏦 Transferencia" : method === "MercadoPago" ? "📱 Mercado Pago" : "💵 Efectivo"}</span>
              </label>
            ))}
          </div>
          <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #334155' }}>
            <h2 style={{ margin: 0 }}>Total: ${totalPrecio}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ESTILOS ---
const inputStyle = { padding: '12px', borderRadius: '5px', border: '1px solid #334155', background: '#0f172a', color: 'white' };
const btnSubmitStyle = { background: '#4ade80', color: '#0f172a', padding: '15px', borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer', marginTop: '10px' };
const radioContainerStyle = { display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '8px', border: '1px solid #334155', cursor: 'pointer' };
const msgContainerStyle = { padding: '100px 20px', textAlign: 'center', color: 'white', background: '#0f172a', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' };
const btnBackStyle = { display: 'inline-block', marginTop: '20px', background: '#38bdf8', color: '#0f172a', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold' };

export default Checkout;