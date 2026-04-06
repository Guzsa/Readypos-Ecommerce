import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../services/firebaseConfig"; 
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

const Login = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    // 1. LOGIN / REGISTRO CON EMAIL
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            if (isRegistering) {
                // REGISTRO
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(userCredential.user, { displayName: name });
                login({ name: name, email: userCredential.user.email });
            } else {
                // LOGIN TRADICIONAL
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                login({ name: userCredential.user.displayName || "Usuario", email: userCredential.user.email });
            }
            navigate("/");
        } catch (err) {
            setError("Error: Verificá los datos e intentá de nuevo.");
        }
    };

    // 2. LOGIN CON GOOGLE
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            login({ name: result.user.displayName, email: result.user.email });
            navigate("/");
        } catch (err) {
            setError("Error al conectar con Google.");
        }
    };

    return (
        <div className="container mt-5 text-white" style={{ maxWidth: '450px' }}>
            <div className="p-4 rounded shadow" style={{ background: '#0f172a', border: '2px solid #38bdf8' }}>
                
                <div className="d-flex justify-content-around mb-4 border-bottom border-secondary pb-2">
                    <button 
                        onClick={() => setIsRegistering(false)} 
                        style={{ background: 'none', border: 'none', color: !isRegistering ? '#38bdf8' : 'gray', fontWeight: 'bold' }}
                    >
                        Ingresar
                    </button>
                    <button 
                        onClick={() => setIsRegistering(true)} 
                        style={{ background: 'none', border: 'none', color: isRegistering ? '#38bdf8' : 'gray', fontWeight: 'bold' }}
                    >
                        Registrarse
                    </button>
                </div>

                {error && <p className="text-danger text-center small">{error}</p>}

                <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                    {isRegistering && (
                        <input 
                            type="text" 
                            placeholder="Nombre completo" 
                            className="form-control bg-dark text-white border-secondary" 
                            required 
                            onChange={(e) => setName(e.target.value)}
                        />
                    )}
                    <input 
                        type="email" 
                        placeholder="Email" 
                        className="form-control bg-dark text-white border-secondary" 
                        required 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Contraseña" 
                        className="form-control bg-dark text-white border-secondary" 
                        required 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    
                    <button type="submit" className="btn btn-info fw-bold mt-2">
                        {isRegistering ? "Crear Cuenta" : "Entrar"}
                    </button>
                </form>

                <div className="text-center my-3 text-secondary">—— o ——</div>

                <button 
                    onClick={handleGoogleLogin} 
                    className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center gap-2"
                    style={{ border: '1px solid #38bdf8' }}
                >
                    <img src="https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png" alt="G" style={{ width: '18px' }} />
                    Continuar con Google
                </button>
            </div>
        </div>
    );
};

export default Login;