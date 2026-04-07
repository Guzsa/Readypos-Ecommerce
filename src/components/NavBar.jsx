import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = async () => {
    await logout();
    closeMenu();
  };

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
    <nav className="navbar navbar-dark sticky-top" style={{ background: '#0f172a', padding: '12px 25px', position: 'relative' }}>
      <div className="container-fluid d-flex align-items-center">
        
        {/* 1. LOGO Y HAMBURGUESA */}
        <div style={{ flex: '1', display: 'flex', alignItems: 'center' }}>
          <button 
            className="navbar-toggler d-lg-none" 
            type="button" 
            onClick={toggleMenu}
            style={{ borderColor: '#38bdf8', marginRight: '15px' }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className="navbar-brand" to="/" onClick={closeMenu} style={{ color: '#38bdf8', fontSize: '1.7rem', fontWeight: 'bold', margin: 0 }}>
            ReadyPOS
          </Link>
        </div>

        {/* 2. CATEGORÍAS (CENTRO) */}
        <div style={menuStyles} className="nav-center-container">
          <ul className="navbar-nav d-flex align-items-center" style={{ gap: '30px' }}>
            <li className="nav-item">
              <NavLink to="/category/rollos" className="nav-link" onClick={closeMenu} style={({ isActive }) => ({ color: isActive ? '#38bdf8' : 'white', fontSize: '0.95rem' })}>
                Rollos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/category/hardware" className="nav-link" onClick={closeMenu} style={({ isActive }) => ({ color: isActive ? '#38bdf8' : 'white', fontSize: '0.95rem' })}>
                Hardware
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/category/impresoras" className="nav-link" onClick={closeMenu} style={({ isActive }) => ({ color: isActive ? '#38bdf8' : 'white', fontSize: '0.95rem' })}>
                Impresoras
              </NavLink>
            </li>

            {/* SECCIÓN MOBILE */}
            <div className="d-lg-none w-100 mt-4 pt-3 border-top border-secondary text-center">
              {user ? (
                <>
                  <p className="text-white small mb-3">{user.name || user.displayName}</p>
                  <button onClick={handleLogout} className="btn btn-danger btn-sm w-100">Cerrar Sesión</button>
                </>
              ) : (
                <Link to="/login" className="btn btn-outline-primary btn-sm w-100" onClick={closeMenu}>Ingresar</Link>
              )}
            </div>
          </ul>
        </div>

        {/* 3. DERECHA: USUARIO Y CARRITO UNIFICADOS */}
        <div style={{ flex: '1', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '25px' }}>
          
          <div className="d-none d-lg-block">
            {user ? (
              <div className="d-flex align-items-center">
                <div className="d-flex flex-column align-items-end" style={{ lineHeight: '1.4' }}>
                  <span style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '0.9rem' }}>
                    {user.name || user.displayName}
                  </span>
                  {/* Más aire con marginTop y quitamos el subrayado para que sea más moderno */}
                  <button 
                    onClick={logout} 
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: '#f87171', 
                      fontSize: '0.75rem', 
                      padding: 0, 
                      marginTop: '4px',
                      cursor: 'pointer',
                      opacity: '0.8'
                    }}
                    onMouseOver={(e) => e.target.style.opacity = '1'}
                    onMouseOut={(e) => e.target.style.opacity = '0.8'}
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" style={{ color: 'white', textDecoration: 'none', fontSize: '0.9rem' }}>Ingresar</Link>
            )}
          </div>

          {/* CARRITO COMO PUNTO FINAL */}
          <Link to="/cart" className="nav-link p-0 d-flex align-items-center" onClick={closeMenu} style={{ color: 'white', fontSize: '1.4rem' }}>
            🛒
          </Link>
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
          .navbar-nav { flex-direction: row !important; }
        }
      `}</style>
    </nav>
  );
};

export default NavBar;