import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, clearCart, removeItem } = useContext(CartContext);

  // 1. DEFINIMOS EL TOTAL ARRIBA DE TODO (Evita el error de "total is not defined")
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // 2. CASO CARRITO VACÍO
  if (cart.length === 0) {
    return (
      <div style={{ 
        padding: '120px 20px', 
        textAlign: 'center', 
        color: 'white', 
        background: '#0f172a', 
        minHeight: '80vh' 
      }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '30px', color: '#38bdf8' }}>Tu carrito está vacío 🛒</h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '40px', opacity: 0.8 }}>¿No sabés qué comprar? ¡Nuestro catálogo tiene los mejores insumos!</p>
        <Link to="/" style={{ 
          background: '#38bdf8', 
          color: '#0f172a', 
          padding: '15px 30px', 
          borderRadius: '8px', 
          textDecoration: 'none', 
          fontWeight: 'bold',
          fontSize: '1.1rem',
          display: 'inline-block'
        }}>
          Volver al Catálogo
        </Link>
      </div>
    );
  }

  // 3. CASO CARRITO CON PRODUCTOS
  return (
    <div style={{ 
      padding: '60px 20px', 
      color: 'white', 
      background: '#0f172a', 
      minHeight: '80vh',
      maxWidth: '1000px',
      margin: '0 auto' 
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        color: '#38bdf8', 
        fontSize: '3rem', 
        marginBottom: '60px', 
        borderBottom: '2px solid #38bdf8', 
        paddingBottom: '20px' 
      }}>
        Tu Carrito
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        {cart.map(item => (
          <div key={item.id} style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            background: '#1e293b', 
            padding: '30px', 
            borderRadius: '12px',
            border: '1px solid #334155',
            boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
          }}>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#38bdf8', fontSize: '1.4rem' }}>{item.name}</h3>
              <p style={{ margin: 0, opacity: 0.8, fontSize: '1.1rem' }}>Cantidad: <span style={{fontWeight: 'bold', color: 'white'}}>{item.quantity}</span></p>
              <p style={{ margin: '8px 0 0 0', fontWeight: 'bold', fontSize: '1.3rem' }}>Subtotal: ${item.price * item.quantity}</p>
            </div>
            
            <button 
              onClick={() => removeItem(item.id)} 
              style={{ 
                background: '#ef4444', 
                color: 'white', 
                border: 'none', 
                padding: '10px 20px', 
                borderRadius: '6px', 
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <div style={{ 
        marginTop: '60px', 
        padding: '40px', 
        background: '#1e293b', 
        borderRadius: '12px', 
        textAlign: 'center',
        border: '2px solid #38bdf8'
      }}>
        <h2 style={{ margin: '0 0 30px 0', fontSize: '2.2rem' }}>
          Total a pagar: <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>${total}</span>
        </h2>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', flexWrap: 'wrap' }}>
          <button 
            onClick={clearCart} 
            style={{ 
              background: 'transparent', 
              color: '#ef4444', 
              border: '2px solid #ef4444', 
              padding: '15px 30px', 
              borderRadius: '8px', 
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Vaciar Carrito
          </button>

          <Link to="/checkout" style={{ textDecoration: 'none' }}>
            <button style={{ 
              background: '#4ade80', 
              color: '#0f172a', 
              border: 'none', 
              padding: '15px 40px', 
              borderRadius: '8px', 
              cursor: 'pointer', 
              fontWeight: 'bold',
              fontSize: '1.2rem'
            }}>
              Finalizar Compra
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;