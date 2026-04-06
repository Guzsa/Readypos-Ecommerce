import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { db } from "../services/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Link } from "react-router-dom";

const Checkout = () => {
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { cart, totalPrecio, clearCart } = useContext(CartContext);

  const [buyer, setBuyer] = useState({ name: "", phone: "", email: "" });
  const [paymentMethod, setPaymentMethod] = useState("");
  
  // Estado para capturar datos de tarjeta o extras
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: ""
  });

  const handleInputChange = (e) => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg("");
  };

  const handlePaymentDataChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // VALIDACIONES DE SEGURIDAD
    if (!paymentMethod) {
      setErrorMsg("⚠️ Por favor, seleccioná un medio de pago.");
      return;
    }

    if (paymentMethod === "Tarjeta" && (paymentData.cardNumber.length < 16 || !paymentData.cardName)) {
      setErrorMsg("⚠️ Los datos de la tarjeta son incompletos o incorrectos.");
      return;
    }

    setLoading(true);

    const order = {
      buyer,
      items: cart,
      total: totalPrecio,
      paymentMethod,
      // Guardamos solo los últimos 4 si es tarjeta por seguridad simulada
      paymentDetail: paymentMethod === "Tarjeta" ? `Visa termina en ${paymentData.cardNumber.slice(-4)}` : "Pendiente",
      date: serverTimestamp(),
      status: "generada"
    };

    try {
      const docRef = await addDoc(collection(db, "orders"), order);
      
      setTimeout(() => {
        setOrderId(docRef.id);
        clearCart();
        setLoading(false);
      }, 2000);

    } catch (error) {
      console.error("Error al generar la orden:", error);
      setErrorMsg("❌ Error de conexión. Intentá nuevamente.");
      setLoading(false);
    }
  };

  // --- RENDERS DE ESTADO (IF CRÍTICOS) ---
  
  if (loading) {
    return (
      <div style={msgContainerStyle}>
        <style>{`
          .spinner-checkout { border: 4px solid rgba(255, 255, 255, 0.1); width: 60px; height: 60px; border-radius: 50%; border-left-color: #38bdf8; animation: spin 1s linear infinite; margin-bottom: 20px; }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        `}</style>
        <div className="spinner-checkout"></div>
        <h2 style={{ color: '#38bdf8' }}>Validando transacción... 🛡️</h2>
        <p style={{ opacity: 0.7 }}>Comunicando con la entidad de pago</p>
      </div>
    );
  }

  if (orderId) {
    return (
      <div style={msgContainerStyle}>
        <h1 style={{ color: '#4ade80' }}>¡Pago Procesado! 🎉</h1>
        <p style={{ fontSize: '1.2rem', margin: '20px 0' }}>Tu comprobante de ReadyPOS es: <strong style={{color: '#38bdf8'}}>{orderId}</strong></p>
        <Link to="/" style={btnBackStyle}>Volver a la Tienda</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 20px', color: 'white', background: '#0f172a', minHeight: '80vh', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#38bdf8', textAlign: 'center', marginBottom: '40px', fontWeight: 'bold' }}>Checkout Final</h1>
      
      {errorMsg && <div style={alertStyle}>{errorMsg}</div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        {/* SECCIÓN 1: DATOS */}
        <section style={sectionStyle}>
          <h3 style={sectionTitleStyle}>1. Información del Comprador</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input type="text" name="name" placeholder="Nombre completo" required onChange={handleInputChange} style={inputStyle} />
            <input type="tel" name="phone" placeholder="Teléfono / WhatsApp" required onChange={handleInputChange} style={inputStyle} />
            <input type="email" name="email" placeholder="Email para recibir factura" required onChange={handleInputChange} style={inputStyle} />
          </div>
        </section>

        {/* SECCIÓN 2: PAGO DINÁMICO */}
        <section style={sectionStyle}>
          <h3 style={sectionTitleStyle}>2. Selección de Pago</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {["Tarjeta", "MercadoPago", "Transferencia", "Efectivo"].map((m) => (
              <label 
                key={m} 
                style={{
                    ...radioContainerStyle, 
                    border: paymentMethod === m ? '1px solid #38bdf8' : '1px solid #334155',
                    background: paymentMethod === m ? '#1e293b' : 'transparent'
                }}
              >
                <input type="radio" name="payment" value={m} onChange={(e) => setPaymentMethod(e.target.value)} />
                <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
                    {m === "Tarjeta" ? "💳 Tarjeta" : m === "MercadoPago" ? "📱 Mercado Pago" : m === "Transferencia" ? "🏦 Transferencia" : "💵 Efectivo"}
                </span>
              </label>
            ))}
          </div>

          {/* ÁREA DE SIMULACIÓN DE PAGO */}
          <div style={{ marginTop: '20px' }}>
            {paymentMethod === "Tarjeta" && (
                <div style={paymentDetailBox}>
                    <input type="text" name="cardNumber" placeholder="Número de Tarjeta (16 dígitos)" maxLength="16" onChange={handlePaymentDataChange} style={{...inputStyle, marginBottom:'10px'}} />
                    <input type="text" name="cardName" placeholder="Nombre como figura en tarjeta" onChange={handlePaymentDataChange} style={{...inputStyle, marginBottom:'10px'}} />
                    <div style={{display:'flex', gap:'10px'}}>
                        <input type="text" name="expiry" placeholder="MM/AA" maxLength="5" style={inputStyle} />
                        <input type="password" name="cvv" placeholder="CVV" maxLength="3" style={inputStyle} />
                    </div>
                </div>
            )}

            {paymentMethod === "MercadoPago" && (
                <div style={{...paymentDetailBox, textAlign:'center'}}>
                    <img src="https://logotipous.com/wp-content/uploads/2021/11/Mercado-Pago-Logo.png" alt="MP" style={{width:'140px', marginBottom:'10px'}} />
                    <p style={{fontSize:'0.9rem', opacity:0.8}}>Al confirmar, se abrirá el portal seguro de Mercado Pago.</p>
                </div>
            )}

            {paymentMethod === "Transferencia" && (
                <div style={paymentDetailBox}>
                    <p style={{color:'#38bdf8', margin:0}}><strong>CBU:</strong> 00000031000987654321</p>
                    <p style={{color:'#38bdf8', margin:0}}><strong>Alias:</strong> readypos.it.oficial</p>
                    <p style={{fontSize:'0.8rem', marginTop:'10px', opacity:0.7}}>* Recordá enviar el comprobante por mail.</p>
                </div>
            )}
          </div>
        </section>

        {/* CIERRE DE COMPRA */}
        <div style={totalContainerStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ fontSize: '1.2rem' }}>Total a abonar:</span>
            <span style={{ fontSize: '2.2rem', fontWeight: 'bold', color: '#38bdf8' }}>${totalPrecio}</span>
          </div>
          <button type="submit" style={btnSubmitStyle}>Confirmar y Pagar 🚀</button>
        </div>
      </form>
    </div>
  );
};

// --- ESTILOS ---
const sectionStyle = { background: '#111a2e', padding: '25px', borderRadius: '12px', border: '1px solid #1e293b' };
const sectionTitleStyle = { color: '#38bdf8', marginBottom: '20px', fontSize: '1.3rem', borderBottom: '1px solid #1e293b', paddingBottom: '10px' };
const inputStyle = { padding: '12px', borderRadius: '8px', border: '1px solid #334155', background: '#0f172a', color: 'white', outline: 'none', width:'100%' };
const paymentDetailBox = { background: '#1e293b', padding: '20px', borderRadius: '10px', border: '1px dashed #38bdf8', animation: 'fadeIn 0.4s ease' };
const btnSubmitStyle = { background: '#4ade80', color: '#0f172a', padding: '18px', borderRadius: '10px', border: 'none', fontWeight: 'bold', fontSize: '1.3rem', cursor: 'pointer', width:'100%' };
const radioContainerStyle = { display: 'flex', alignItems: 'center', padding: '15px', borderRadius: '10px', cursor: 'pointer' };
const totalContainerStyle = { background: '#0f172a', padding: '30px', borderRadius: '15px', border: '2px solid #38bdf8' };
const alertStyle = { background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', padding: '15px', borderRadius: '10px', border: '1px solid #ef4444', marginBottom: '20px', textAlign: 'center' };
const msgContainerStyle = { padding: '100px 20px', textAlign: 'center', color: 'white', background: '#0f172a', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' };
const btnBackStyle = { display: 'inline-block', marginTop: '20px', background: '#38bdf8', color: '#0f172a', padding: '12px 25px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' };

export default Checkout;