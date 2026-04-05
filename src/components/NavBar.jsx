import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: '#0f172a', borderBottom: '2px solid #38bdf8', padding: '10px 20px' }}>
      <div className="container-fluid">
        
        {/* LOGO */}
        <Link className="navbar-brand" to="/" style={{ color: '#38bdf8', fontSize: '1.8rem', fontWeight: 'bold' }}>
          ReadyPOS
        </Link>

        {/* BOTÓN HAMBURGUESA (Se activa en celulares) */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
          style={{ borderColor: '#38bdf8' }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* LINKS COLAPSABLES */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            
            <li className="nav-item">
              <NavLink 
                to="/category/rollos" 
                className="nav-link"
                style={({ isActive }) => ({ 
                  color: isActive ? '#38bdf8' : 'white', 
                  fontWeight: isActive ? 'bold' : 'normal',
                  margin: '0 10px'
                })}
              >
                Rollos
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink 
                to="/category/hardware" 
                className="nav-link"
                style={({ isActive }) => ({ 
                  color: isActive ? '#38bdf8' : 'white', 
                  fontWeight: isActive ? 'bold' : 'normal',
                  margin: '0 10px'
                })}
              >
                Hardware
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink 
                to="/category/impresoras" 
                className="nav-link"
                style={({ isActive }) => ({ 
                  color: isActive ? '#38bdf8' : 'white', 
                  fontWeight: isActive ? 'bold' : 'normal',
                  margin: '0 10px'
                })}
              >
                Impresoras
              </NavLink>
            </li>

            {/* CARRITO */}
            <li className="nav-item">
              <Link to="/cart" className="nav-link" style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span>Tu Carrito</span>
                <span>🛒</span>
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;