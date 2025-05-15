import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { obtenerPacientePorDni, obtenerMedicoPorDni } from '../services/orquestador'; 

export default function Login() {
  const [dni, setDni] = useState('');
  const [isPaciente, setIsPaciente] = useState(true); 
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!dni) {
      setErrorMessage('Por favor ingresa tu DNI.');
      return;
    }

    try {
      let usuario;
      if (isPaciente) {
        usuario = await obtenerPacientePorDni(dni);
        const usuarioConDni = { ...usuario, dni };
        localStorage.setItem('usuario', JSON.stringify(usuarioConDni));
        navigate('/mainPage');
      } else {
        usuario = await obtenerMedicoPorDni(dni);
        const usuarioConDni = { ...usuario, dni };
        localStorage.setItem('usuario', JSON.stringify(usuarioConDni));
        navigate('/mainDoctor');
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      setErrorMessage('Hubo un problema al iniciar sesión. Intenta nuevamente.');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register'); 
  };

  const styles = {
    background: {
      height: '100vh',
      width: '100vw',
      margin: 0,
      padding: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(270deg, #3364ff, #003366, #00cfff)',
      backgroundSize: '600% 600%',
      animation: 'backgroundAnimation 15s infinite alternate',
    },
    box: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '20px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.15)',
      width: '320px',
      textAlign: 'center' as const,
    },
    input: {
      width: '100%',
      height: '30px',
      backgroundColor: 'white',
      border: '1px solid black',
      borderRadius: '10px',
      textAlign: 'center' as 'center',
      color: 'black',
    },
    button: {
      marginTop: '1.5rem',
      width: '100%',
      backgroundColor: '#3364ff',
      color: 'white',
      padding: '0.5rem',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
    },
    label: {
      color: 'black',
    },
    logo: {
      display: 'block',
      margin: '0 auto',
      width: '200px',
      height: 'auto',
      marginBottom: '1rem',
    },
    title: {
      color: 'black',
    },
    registerContainer: {
      marginTop: '1rem',
      textAlign: 'center' as const,
    },
    registerText: {
      display: 'inline-block',
      marginRight: '0.5rem',
      color: 'black',
      fontSize: '0.87rem',
    },
    registerLink: {
      color: '#3f6cfd',
      textDecoration: 'underline',
      cursor: 'pointer',
      fontSize: '0.87rem',
    },
    errorMessage: {
      color: 'red',
      marginTop: '1rem',
    },
  };

  return (
    <div style={styles.background}>
      <div style={styles.box}>
        <form onSubmit={handleSubmit}>
          <h2 style={styles.title}>Identifícate:</h2>
          <img src={logo} alt="logo" style={styles.logo} />

          <div>
            <label style={styles.label}>DNI:</label>
            <br />
            <input
              type="text"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              placeholder="12345678"
              required
              style={styles.input}
            />
          </div>

          <div style={{ marginTop: '1rem' }}>
            <label style={styles.label}>Soy:</label>
            <br />
            <select
              value={isPaciente ? 'paciente' : 'medico'}
              onChange={(e) => setIsPaciente(e.target.value === 'paciente')}
              style={styles.input}
            >
              <option value="paciente">Paciente</option>
              <option value="medico">Médico</option>
            </select>
          </div>

          {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}

          <button type="submit" style={styles.button}>
            Entrar
          </button>
        </form>

        <div style={styles.registerContainer}>
          <span style={styles.registerText}>¿Aún no estás registrado?</span>
          <span
            style={styles.registerLink}
            onClick={handleRegisterRedirect}
          >
            Regístrate
          </span>
        </div>
      </div>
    </div>
  );
}
