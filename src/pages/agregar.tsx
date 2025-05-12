import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../utilities/sidebar';
import { SidebarItem } from '../utilities/sidebaritem';
import { Home, LogOut, Plus, Settings } from 'lucide-react';

export default function MainPage() {
  const navigate = useNavigate();
  const [especialidad, setEspecialidad] = useState('');
  const [fechaHora, setFechaHora] = useState('');
  const [idCita, setIdCita] = useState('');
  const [idDoctor, setIdDoctor] = useState('');
  const [idPaciente, setIdPaciente] = useState('');
  const [tipo, setTipo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleCrearCita = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar los campos antes de enviar
    if (!especialidad || !fechaHora || !idCita || !idDoctor || !idPaciente || !tipo) {
      setErrorMessage('Todos los campos son obligatorios');
      return;
    }

    try {
      // Llamada al servicio para crear la cita
      setSuccessMessage('Cita creada correctamente');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Error al crear la cita');
      setSuccessMessage('');
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <Sidebar>
        <SidebarItem icon={<Home />} text="Inicio" onClick={() => navigate('/mainPage')} />
        <SidebarItem icon={<Plus />} text="Crear Cita" active onClick={() => navigate('/agregar')} />
        <SidebarItem icon={<Settings />} text="Configuración" />
        <SidebarItem icon={<LogOut />} text="Cerrar sesión" onClick={handleLogout} />

      </Sidebar>

      <div style={styles.mainContent}>
        <h1 style={styles.title}>Crear Cita Médica</h1>

        {/* Mostrar mensajes de éxito o error */}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        {/* Formulario para crear cita */}
        <form onSubmit={handleCrearCita} style={styles.form}>
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label>Especialidad:</label>
              <input
                type="text"
                value={especialidad}
                onChange={(e) => setEspecialidad(e.target.value)}
                placeholder="Especialidad"
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label>Fecha y Hora:</label>
              <input
                type="datetime-local"
                value={fechaHora}
                onChange={(e) => setFechaHora(e.target.value)}
                style={styles.input}
                required
              />
            </div>
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label>ID de Cita:</label>
              <input
                type="text"
                value={idCita}
                onChange={(e) => setIdCita(e.target.value)}
                placeholder="ID de la cita"
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label>ID del Doctor:</label>
              <input
                type="text"
                value={idDoctor}
                onChange={(e) => setIdDoctor(e.target.value)}
                placeholder="ID del doctor"
                style={styles.input}
                required
              />
            </div>
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label>ID del Paciente:</label>
              <input
                type="text"
                value={idPaciente}
                onChange={(e) => setIdPaciente(e.target.value)}
                placeholder="ID del paciente"
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label>Tipo de Cita:</label>
              <input
                type="text"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                placeholder="Tipo de cita"
                style={styles.input}
                required
              />
            </div>
          </div>

          <button
            style={styles.button}
            type="submit"
          >
            Crear Cita
          </button>
        </form>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#f5f5f5',
    color: '#333',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#f7f7f7',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    width: '100%',
    maxWidth: '800px',
  },
  formRow: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
  },
  formGroup: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '14px',
    marginBottom: '5px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    border: '1px solid #e0e0e0',
    borderRadius: '15px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    fontSize: '16px',
    color: '#333',
    textAlign: 'center',
  },
  button: {
    marginTop: '20px',
    padding: '12px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
  },
};
