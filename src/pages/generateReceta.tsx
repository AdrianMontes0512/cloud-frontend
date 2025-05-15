import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import Sidebar from '../utilities/sidebar';
import { SidebarItem } from '../utilities/sidebaritem';
import { Home } from 'lucide-react';
import { generarReceta } from '../services/orquestador'; 

export default function GenerateReceta() {
  const navigate = useNavigate();
  const location = useLocation();

  const idCita = location.state?.idCita || '';
  const idDoctor = location.state?.idDoctor || '';
  const idPaciente = location.state?.idPaciente || '';

  const [diagnostico, setDiagnostico] = useState('');
  const [duracion, setDuracion] = useState('');
  const [medicamentos, setMedicamentos] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [requiereExamen, setRequiereExamen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleCrearReceta = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!diagnostico || !duracion || !idCita || !idDoctor || !idPaciente || !medicamentos) {
      setErrorMessage('Todos los campos obligatorios deben estar llenos');
      setSuccessMessage('');
      return;
    }

    try {
      await generarReceta({
        diagnostico,
        duracion,
        idcita: idCita,
        iddoctor: idDoctor,
        idpaciente: idPaciente,
        medicamentos,
        observaciones,
        requiere_examen_medico: requiereExamen,
      });
      setSuccessMessage('Receta generada correctamente');
      setErrorMessage('');
      if (requiereExamen) {
        navigate('/generarExamen', {
          state: {
            idCita,
            idDoctor,
            idPaciente,
          },
        });
      }
    } catch (error) {
      setErrorMessage('Error al generar la receta');
      setSuccessMessage('');
    }
  };

  return (
    <div style={styles.container}>
      <Sidebar>
        <SidebarItem icon={<Home />} text="Inicio" onClick={() => navigate('/mainDoctor')} />
      </Sidebar>

      <div style={styles.mainContent}>
        <h1 style={styles.title}>Generar Receta Médica</h1>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        <form onSubmit={handleCrearReceta} style={styles.form}>
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label>Diagnóstico:</label>
              <input
                type="text"
                value={diagnostico}
                onChange={e => setDiagnostico(e.target.value)}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label>Duración:</label>
              <input
                type="text"
                value={duracion}
                onChange={e => setDuracion(e.target.value)}
                style={styles.input}
                required
              />
            </div>
          </div>
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label>Medicamentos:</label>
              <input
                type="text"
                value={medicamentos}
                onChange={e => setMedicamentos(e.target.value)}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label>Observaciones:</label>
              <input
                type="text"
                value={observaciones}
                onChange={e => setObservaciones(e.target.value)}
                style={styles.input}
              />
            </div>
          </div>
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label>
                <input
                  type="checkbox"
                  checked={requiereExamen}
                  onChange={e => setRequiereExamen(e.target.checked)}
                  style={{ marginRight: '8px' }}
                />
                ¿Requiere examen médico?
              </label>
            </div>
          </div>
          <button style={styles.button} type="submit">
            Generar Receta
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