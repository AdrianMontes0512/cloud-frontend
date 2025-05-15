import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { crearPaciente } from '../services/orquestador'; 

export default function Register() {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [dni, setDni] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [sexo, setSexo] = useState('');
  const [direccion, setDireccion] = useState('');
  const [seguroSalud, setSeguroSalud] = useState(false);
  const [estadoCivil, setEstadoCivil] = useState('');
  const [tipoSangre, setTipoSangre] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const pacienteData = {
      apellidos,
      direccion,
      dni,
      email,
      nombres,
      telefono,
      fechaNacimiento,
      sexo,
      seguroSalud,
      estadoCivil,
      tipoSangre,
      password: 'defaultPassword', 
    };

    try {
      const pacienteCreado = await crearPaciente(pacienteData);
      console.log('Paciente creado:', pacienteCreado);
      navigate('/'); 
    } catch (error) {
      console.error('Error al registrar paciente:', error);
      setErrorMessage('Hubo un error al registrar el paciente. Intenta nuevamente.');
    }
  };

  const handleRegisterMedico = () => {
    navigate('/registerMedico'); 
  };
  const handleRegisterRedirect = () => {
    navigate('/');
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
      width: '640px',
      textAlign: 'center' as React.CSSProperties['textAlign'],
    },
    input: {
      width: '100%',
      height: '30px',
      backgroundColor: 'white',
      border: '1px solid black',
      borderRadius: '10px',
      textAlign: 'center' as React.CSSProperties['textAlign'],
      color: 'black',
    },
    inputRow: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '1rem',
      marginTop: '1rem',
      width: '100%',
      flexWrap: 'wrap' as React.CSSProperties['flexWrap'],
    },
    inputHalf: {
      width: '100%',
      height: '35px',
      backgroundColor: 'white',
      border: '1px solid black',
      borderRadius: '10px',
      textAlign: 'center' as React.CSSProperties['textAlign'],
      color: 'black',
      marginBottom: '1rem',
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
      display: 'block',
      marginBottom: '0.2rem',
      fontSize: '1rem',
      textAlign: 'center' as const,
    },
    logo: {
      display: 'block',
      margin: '0 auto',
      width: '150px',
      height: 'auto',
      marginBottom: '1rem',
    },
    title: {
      color: 'black',
    },
    loginContainer: {
      marginTop: '1rem',
      textAlign: 'center' as const,
    },
    loginText: {
      fontSize: '0.875rem',
      color: 'black',
    },
    loginLink: {
      fontSize: '0.875rem',
      color: '#3f6cfd',
      textDecoration: 'underline',
      cursor: 'pointer',
    },
    errorMessage: {
      color: 'red',
      marginTop: '1rem',
    },
    redirectButton: {
      position: 'absolute' as React.CSSProperties['position'],
      top: '20px',
      right: '20px',
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    registerContainer: {
      marginTop: '1rem',
      textAlign: 'center' as const,
    },
    registerText: {
      display: 'inline-block',
      marginRight: '0.5rem',
      color: 'black',
      fontSize: '0.87rem'
    },
    registerLink: {
      color: '#3f6cfd',
      textDecoration: 'underline',
      cursor: 'pointer',
      fontSize: '0.87rem'
    },
  };

  return (
    <div style={styles.background}>
      <button style={styles.redirectButton} onClick={handleRegisterMedico}>
        Registrar Medico
      </button>

      <div style={styles.box}>
        <form onSubmit={handleSubmit}>
          <h2 style={styles.title}>Regístrate como Paciente:</h2>
          <img src={logo} alt="logo" style={styles.logo} />

          {/* Inputs en dos columnas */}
          <div style={styles.inputRow}>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Nombres:</label>
              <input
                type="text"
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
                placeholder="Juan"
                required
                style={styles.inputHalf}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Apellidos:</label>
              <input
                type="text"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                placeholder="Pérez"
                required
                style={styles.inputHalf}
              />
            </div>
          </div>

          <div style={styles.inputRow}>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Correo Electrónico:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@example.com"
                required
                style={styles.inputHalf}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>DNI:</label>
              <input
                type="text"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                placeholder="12345678"
                required
                style={styles.inputHalf}
              />
            </div>
          </div>

          <div style={styles.inputRow}>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Fecha de Nacimiento:</label>
              <input
                type="date"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                required
                style={styles.inputHalf}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Sexo:</label>
              <select
                value={sexo}
                onChange={(e) => setSexo(e.target.value)}
                required
                style={styles.inputHalf}
              >
                <option value="">Selecciona</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Prefiero no decir">Prefiero no decir</option>
              </select>
            </div>
          </div>

          <div style={styles.inputRow}>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Dirección:</label>
              <input
                type="text"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                placeholder="Calle Ficticia 123"
                required
                style={styles.inputHalf}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Número de Teléfono:</label>
              <input
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="987654321"
                required
                style={styles.inputHalf}
              />
            </div>
          </div>

          {/* Campos Opcionales */}
          <div style={styles.inputRow}>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Seguro de Salud:</label>
              <input
                type="checkbox"
                checked={seguroSalud}
                onChange={(e) => setSeguroSalud(e.target.checked)}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Estado Civil:</label>
              <select
                value={estadoCivil}
                onChange={(e) => setEstadoCivil(e.target.value)}
                style={styles.inputHalf}
              >
                <option value="">Selecciona</option>
                <option value="Soltero">Soltero</option>
                <option value="Casado">Casado</option>
                <option value="Divorciado">Divorciado</option>
                <option value="Viudo">Viudo</option>
              </select>
            </div>
          </div>

          <div style={styles.inputRow}>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Tipo de Sangre:</label>
              <select
                value={tipoSangre}
                onChange={(e) => setTipoSangre(e.target.value)}
                style={styles.inputHalf}
              >
                <option value="">Selecciona</option>
                <option value="A+">A+</option>
                <option value="O+">O+</option>
                <option value="B+">B+</option>
                <option value="AB+">AB+</option>
              </select>
            </div>
          </div>

          {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
          <button type="submit" style={styles.button}>
            Registrarse
          </button>
        </form>
        <div style={styles.registerContainer}>
          <span style={styles.registerText}>¿Ya estas registrado?</span>
          <span
            style={styles.registerLink}
            onClick={handleRegisterRedirect}
          >
            Login 
          </span>
        </div>
      </div>
    </div>
  );
}
