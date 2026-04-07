const Footer = () => {
  return (
    <footer style={{
      background: '#0f172a',
      color: 'white',
      // Aumentamos el padding vertical (80px arriba y abajo) para dar mucho más aire
      padding: '80px 20px', 
      borderTop: '2px solid #38bdf8',
      marginTop: '100px', // Forzamos un margen superior bien grande para que no pegue al contenido
      textAlign: 'center'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        // El gap es clave en mobile para que no se choquen las columnas
        gap: '40px', 
        maxWidth: '1200px',
        margin: '0 auto 40px'
      }}>
        
        {/* Info Marca */}
        <div style={{ flex: '1', minWidth: '250px' }}>
          <h3 style={{ color: '#38bdf8', marginBottom: '20px', fontSize: '1.8rem' }}>ReadyPOS</h3>
          <p style={{ fontSize: '1rem', opacity: '0.8', lineHeight: '1.6' }}>
            Líderes en tecnología para puntos de venta y gestión comercial.
          </p>
        </div>

        {/* Contacto */}
        <div style={{ flex: '1', minWidth: '250px' }}>
          <h4 style={{ marginBottom: '20px', fontWeight: 'bold' }}>Contacto</h4>
          <p style={{ fontSize: '0.95rem', opacity: '0.8', marginBottom: '10px' }}>📍 Villa Devoto, CABA</p>
          <p style={{ fontSize: '0.95rem', opacity: '0.8', marginBottom: '10px' }}>📧 santiguzman1336@gmail.com</p>
          <p style={{ fontSize: '0.95rem', opacity: '0.8' }}>📞 +54 11 1234-5678</p>
        </div>

        {/* Redes Sociales */}
        <div style={{ flex: '1', minWidth: '250px' }}>
          <h4 style={{ marginBottom: '20px', fontWeight: 'bold' }}>Seguinos</h4>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '25px' }}>
            <a 
              href="https://www.instagram.com/santyguzman27/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: '#38bdf8', 
                textDecoration: 'none', 
                fontWeight: 'bold',
                fontSize: '1rem',
                border: '1px solid #38bdf8',
                padding: '8px 15px',
                borderRadius: '5px'
              }}
            >
              Instagram
            </a>

            <a 
              href="https://www.linkedin.com/in/santiagomguzman4530/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: '#38bdf8', 
                textDecoration: 'none', 
                fontWeight: 'bold',
                fontSize: '1rem',
                border: '1px solid #38bdf8',
                padding: '8px 15px',
                borderRadius: '5px'
              }}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Barra Inferior */}
      <div style={{ 
        borderTop: '1px solid #1e293b', 
        paddingTop: '40px', 
        marginTop: '20px',
        fontSize: '0.85rem', 
        opacity: '0.5' 
      }}>
        © 2026 ReadyPOS - Desarrollado por Santiago para Coderhouse.
      </div>
    </footer>
  );
};

export default Footer;