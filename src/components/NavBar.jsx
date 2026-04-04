import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '15px 40px', 
      background: '#0f172a', 
      color: 'white',
      borderBottom: '2px solid #38bdf8' 
    }}>
      
     
      <Link to="/" style={{ color: '#38bdf8', fontSize: '1.8rem', fontWeight: 'bold', textDecoration: 'none' }}>
        ReadyPOS
      </Link>

      
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        
        <NavLink 
          to="/category/rollos" 
          style={({ isActive }) => ({ 
            margin: '0 10px', 
            color: isActive ? '#38bdf8' : 'white', 
            textDecoration: 'none',
            fontWeight: isActive ? 'bold' : 'normal'
          })}
        >
          Rollos
        </NavLink>

        <NavLink 
          to="/category/hardware" 
          style={({ isActive }) => ({ 
            margin: '0 10px', 
            color: isActive ? '#38bdf8' : 'white', 
            textDecoration: 'none',
            fontWeight: isActive ? 'bold' : 'normal'
          })}
        >
          Hardware
        </NavLink>

        <NavLink 
          to="/category/impresoras" 
          style={({ isActive }) => ({ 
            margin: '0 10px', 
            color: isActive ? '#38bdf8' : 'white', 
            textDecoration: 'none',
            fontWeight: isActive ? 'bold' : 'normal'
          })}
        >
          Impresoras
        </NavLink>

        {/* CARRITO SIMPLE: Para que no tire error de importación */}
        <Link to="/cart" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', color: 'white' }}>
          <span style={{ fontSize: '1.2rem' }}>Tu Carrito</span>
          <span style={{ fontSize: '1.5rem' }}>🛒</span>
        </Link>

      </div>
    </nav>
  );
};

export default NavBar;