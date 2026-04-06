import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Estilos para el menú desplegable (Overlay en celulares)
  const menuStyles = {
    position: 'absolute',
    top: '100%', 
    left: 0,
    width: '100%',
    background: '#0f172a', 
    borderBottom: '2px solid #38bdf8',
    zIndex: 1000,
    transition: 'all 0.3s ease-in-out',
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? 'visible' : 'hidden',
    transform: isOpen ? 'translateY(0)' : 'translateY(-10px)',
    padding: '20px'
  };

  return (
    <nav className="navbar navbar-dark sticky-top" style={{ background: '#0f172a', borderBottom: '2px solid #38bdf8', padding: '10px 20px', position: 'relative' }}>
      <div className="container-fluid d-flex align-items-center">
        
        {/* 1. BOTÓN HAMBURGUESA (AHORA A LA IZQUIERDA DEL LOGO) */}
        <button 
          className="navbar-toggler d-lg-none" 
          type="button" 
          onClick={toggleMenu}
          style={{ borderColor: '#38bdf8', marginRight: '15px' }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 2. LOGO (CENTRO-IZQUIERDA) */}
        <div style={{ flex: '1', display: 'flex', alignItems: 'center' }}>
          <Link className="navbar-brand" to="/" onClick={closeMenu} style={{ color: '#38bdf8', fontSize: '1.8rem', fontWeight: 'bold', margin: 0 }}>
            ReadyPOS
          </Link>
        </div>

        {/* 3. NAVEGACIÓN CENTRAL (LINKS) */}
        <div style={menuStyles} className="nav-center-container">
          <ul className="navbar-nav d-flex flex-row justify-content-center align-items-center" style={{ gap: '30px' }}>
            <li className="nav-item">
              <NavLink to="/category/rollos" className="nav-link" onClick={closeMenu} style={({ isActive }) => ({ color: isActive ? '#38bdf8' : 'white', fontWeight: isActive ? 'bold' : 'normal' })}>
                Rollos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/category/hardware" className="nav-link" onClick={closeMenu} style={({ isActive }) => ({ color: isActive ? '#38bdf8' : 'white', fontWeight: isActive ? 'bold' : 'normal' })}>
                Hardware
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/category/impresoras" className="nav-link" onClick={closeMenu} style={({ isActive }) => ({ color: isActive ? '#38bdf8' : 'white', fontWeight: isActive ? 'bold' : 'normal' })}>
                Impresoras
              </NavLink>
            </li>
          </ul>
        </div>

        {/* 4. ACCESOS DERECHA (CARRITO Y CUENTA) */}
        <div style={{ flex: '1', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '20px' }}>
          
          {/* CARRITO */}
          <Link to="/cart" className="nav-link p-0" onClick={closeMenu} style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="d-none d-md-inline" style={{fontSize: '0.9rem'}}>Tu Carrito</span>
            <span style={{ fontSize: '1.4rem' }}>🛒</span>
          </Link>

          {/* CUENTA / LOGIN */}
          <div className="account-section">
            {user ? (
              <div className="d-flex align-items-center gap-2">
                <div className="d-none d-md-flex flex-column align-items-end" style={{ lineHeight: '1' }}>
                  <span style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '0.85rem' }}>{user.name}</span>
                  <button onClick={logout} style={{ background: 'none', border: 'none', color: '#f87171', fontSize: '0.65rem', padding: 0 }}>Salir</button>
                </div>
                <span style={{ fontSize: '1.6rem', cursor: 'default' }}>👤</span>
              </div>
            ) : (
              <Link to="/login" onClick={closeMenu} style={{ color: 'white', textDecoration: 'none' }}>
                <span style={{ fontSize: '1.6rem' }}>👤</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .nav-center-container {
            position: static !important;
            opacity: 1 !important;
            visibility: visible !important;
            display: flex !important;
            justify-content: center !important;
            flex: 2 !important;
            padding: 0 !important;
            transform: none !important;
          }
          .navbar-nav {
            flex-direction: row !important;
          }
        }
        @media (max-width: 991px) {
          .nav-center-container ul {
            flex-direction: column !important;
            gap: 15px !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default NavBar;