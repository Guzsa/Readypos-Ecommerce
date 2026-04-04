const Footer = () => {
  return (
    <footer style={{
      background: '#0f172a',
      color: 'white',
      padding: '40px 20px',
      borderTop: '2px solid #38bdf8',
      marginTop: 'auto', 
      textAlign: 'center'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto 20px'
      }}>
        
        <div style={{ flex: '1', minWidth: '200px' }}>
          <h3 style={{ color: '#38bdf8', marginBottom: '15px' }}>ReadyPOS</h3>
          <p style={{ fontSize: '0.9rem', opacity: '0.8' }}>
            Líderes en tecnología para puntos de venta y gestión comercial.
          </p>
        </div>

        
        <div style={{ flex: '1', minWidth: '200px' }}>
          <h4 style={{ marginBottom: '15px' }}>Contacto</h4>
          <p style={{ fontSize: '0.9rem', opacity: '0.8' }}>📍 Villa devoto, CABA</p>
          <p style={{ fontSize: '0.9rem', opacity: '0.8' }}>📧 santiguzman1336@gmail.com</p>
          <p style={{ fontSize: '0.9rem', opacity: '0.8' }}>📞 +54 11 1234-5678</p>
        </div>

       
<div style={{ flex: '1', minWidth: '200px' }}>
  <h4 style={{ marginBottom: '15px' }}>Seguinos</h4>
  <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
    
    <a 
      href="https://www.instagram.com/santyguzman27/" 
      target="_blank" 
      rel="noopener noreferrer"
      style={{ 
        color: '#38bdf8', 
        textDecoration: 'none', 
        fontWeight: 'bold',
        fontSize: '0.9rem' 
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
        fontSize: '0.9rem' 
      }}
    >
      LinkedIn
    </a>

  </div>
</div>
</div>

      <div style={{ 
        borderTop: '1px solid #1e293b', 
        paddingTop: '20px', 
        fontSize: '0.8rem', 
        opacity: '0.6' 
      }}>
        © 2026 ReadyPOS - Desarrollado por Santiago para Coderhouse.
      </div>
    </footer>
  );
};

export default Footer;