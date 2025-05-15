import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../utilities/sidebar';
import { SidebarItem } from '../utilities/sidebaritem';
import { Home } from 'lucide-react';
import { crearExamen } from '../services/orquestador';

export default function GenerarExamen() {
  const navigate = useNavigate();
  const location = useLocation();

  const citaId = location.state?.idCita || '';
  const medicoId = location.state?.idDoctor || '';
  const pacienteId = location.state?.idPaciente || '';
  const diagnostico = location.state?.diagnostico || '';
  const especialidad = location.state?.especialidad || '';
  const fechaSolicitud = location.state?.fechaSolicitud || location.state?.fecha || '';

  const [descripcion, setDescripcion] = useState('');
  const [resultado, setResultado] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [diagnosticoInput, setDiagnosticoInput] = useState(diagnostico);
  const [fechaSolicitudInput, setFechaSolicitudInput] = useState(fechaSolicitud);

  const handleCrearExamen = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!citaId || !descripcion || !medicoId || !pacienteId || !resultado || !diagnosticoInput || !especialidad || !fechaSolicitudInput) {
      setErrorMessage('Todos los campos son obligatorios');
      setSuccessMessage('');
      return;
    }

    try {
      console.log('Datos del examen:', {
        citaId,
        descripcion,
        medicoId,
        pacienteId,
        resultado,
        diagnostico: diagnosticoInput,
        especialidad,
        fechaSolicitud: fechaSolicitudInput,
      });
      await crearExamen({
        citaId,
        descripcion,
        medicoId,
        pacienteId,
        resultado,
        diagnostico: diagnosticoInput,
        especialidad,
        fechaSolicitud: fechaSolicitudInput,
      });
      setSuccessMessage('Examen generado correctamente');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Error al generar el examen');
      setSuccessMessage('');
    }
  };

  return (
    <div style={styles.container}>
      <Sidebar>
        <SidebarItem icon={<Home />} text="Inicio" onClick={() => navigate('/mainDoctor')} />
      </Sidebar>

      <div style={styles.mainContent}>
        <h1 style={styles.title}>Generar Examen Médico</h1>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        <form onSubmit={handleCrearExamen} style={styles.form}>
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label>Descripción:</label>
              <input
                type="text"
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
                style={styles.input}
                required
                placeholder="Descripción del examen"
                maxLength={200}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Resultado:</label>
              <input
                type="text"
                value={resultado}
                onChange={e => setResultado(e.target.value)}
                style={styles.input}
                required
                placeholder="Resultado del examen"
                maxLength={200}
              />
            </div>
          </div>
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label>Diagnóstico:</label>
              <input
                type="text"
                value={diagnosticoInput}
                onChange={e => setDiagnosticoInput(e.target.value)}
                style={styles.input}
                required
                placeholder="Diagnóstico"
                maxLength={200}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Fecha de Solicitud:</label>
              <input
                type="datetime-local"
                value={fechaSolicitudInput}
                onChange={e => setFechaSolicitudInput(e.target.value)}
                style={styles.input}
                required
              />
            </div>
          </div>
          <button style={styles.button} type="submit">
            Generar Examen
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
    backgroundColor: '#2196F3',
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