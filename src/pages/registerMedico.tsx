import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { crearMedico } from '../services/orquestador'; 

export default function RegisterMedico() {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [dni, setDni] = useState('');
  const [telefono] = useState('');
  const [email, setEmail] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [sexo, setSexo] = useState('');
  const [direccion] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [colegiatura, setColegiatura] = useState('');
  const [horario, setHorario] = useState([{ dia: '', turnos: [{ inicio: '', fin: '' }] }]); 
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const medicoData = {
      nombres,
      apellidos,
      dni,
      telefono,
      email,
      fechaNacimiento,
      sexo,
      direccion,
      especialidad,
      colegiatura,
      horario,
      password: 'defaultPassword', 
    };

    try {
      const medicoCreado = await crearMedico(medicoData); 
      console.log('Médico creado:', medicoCreado);
      navigate('/'); 
    } catch (error) {
      console.error('Error al registrar médico:', error);
      setErrorMessage('Hubo un error al registrar el médico. Intenta nuevamente.');
    }
  };

  const handleRegisterMedico = () => {
    navigate('/register'); 
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
        Registrar Paciente
      </button>

      <div style={styles.box}>
        <form onSubmit={handleSubmit}>
          <h2 style={styles.title}>Regístrate como Médico:</h2>
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

          {/* Campos Específicos para Médico */}
          <div style={styles.inputRow}>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Especialidad:</label>
              <input
                type="text"
                value={especialidad}
                onChange={(e) => setEspecialidad(e.target.value)}
                placeholder="Especialidad médica"
                required
                style={styles.inputHalf}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Colegiatura:</label>
              <input
                type="text"
                value={colegiatura}
                onChange={(e) => setColegiatura(e.target.value)}
                placeholder="Número de colegiatura"
                required
                style={styles.inputHalf}
              />
            </div>
          </div>

          <div style={styles.inputRow}>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Día de Trabajo:</label>
              <input
                type="text"
                value={horario[0]?.dia}
                onChange={(e) => setHorario([{ dia: e.target.value, turnos: [{ inicio: '', fin: '' }] }])}
                placeholder="Día de trabajo"
                required
                style={styles.inputHalf}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Turno de Inicio:</label>
              <input
                type="text"
                value={horario[0]?.turnos[0]?.inicio}
                onChange={(e) =>
                  setHorario([{ dia: horario[0]?.dia, turnos: [{ inicio: e.target.value, fin: '' }] }])
                }
                placeholder="Inicio del turno"
                required
                style={styles.inputHalf}
              />
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
