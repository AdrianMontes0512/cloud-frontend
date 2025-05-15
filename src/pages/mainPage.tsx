import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../utilities/sidebar';
import { SidebarItem } from '../utilities/sidebaritem';
import { Home, Plus} from 'lucide-react';
import { buscarMedicos } from '../services/orquestador'; 
import { obtenerCitasPorPaciente } from '../services/orquestador'; 

export default function MainPage() {
  const [especialidad, setEspecialidad] = useState('');
  const [dia, setDia] = useState('');
  const [medicos, setMedicos] = useState<any[]>([]);
  const [historialCitas, setHistorialCitas] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>(null); 
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const pacienteId = localStorage.getItem('usuario') ? JSON.parse(localStorage.getItem('usuario') || '').dni : ''; 
  const diasSemana = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes','Sabado', 'Domingo'];
  const especialidades = ['Anestesiología', 'Cardiología', 'Dermatología', 'Endocrinología', 'Gastroenterología', 'Geriatría', 'Ginecología', 'Hematología', 'Infectología', 'Medicina del Trabajo', 'Medicina de Emergencia', 'Medicina General', 'Medicina Interna', 'Nefrología', 'Neumología', 'Neurología', 'Nutriología', 'Obstetricia', 'Oftalmología', 'Oncología', 'Ortopedia', 'Otorrinolaringología', 'Pediatría', 'Psiquiatría', 'Radiología', 'Reumatología', 'Traumatología', 'Urología', 'Cirugía General', 'Cirugía Plástica', 'Cirugía Cardiovascular', 'Cirugía Pediátrica', 'Cirugía Neurológica'];

  useEffect(() => {
    const fetchData = async () => {
      const storedUser = localStorage.getItem('usuario');
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
      }

      try {
        const response = await obtenerCitasPorPaciente(pacienteId);
        const citas = Array.isArray(response.data)
          ? response.data.map((citaArr: any[]) => ({
              id: citaArr[0],
              pacienteDni: citaArr[1],
              medicoDni: citaArr[2],
              especialidad: citaArr[3],
              fecha: citaArr[4],
              tipo: citaArr[5],
            }))
          : [];
        setHistorialCitas(citas);
      } catch (error) {
        setErrorMessage('');
      }
    };

    fetchData();
  }, [pacienteId]);

  const handleBuscar = async () => {
  if (!especialidad || !dia) {
    setErrorMessage('Por favor selecciona tanto la especialidad como el día.');
    return;
  }
  try {
    const medicosDisponibles = await buscarMedicos(especialidad, dia); 
    setMedicos(medicosDisponibles);
    console.log('Médicos disponibles:', medicosDisponibles);
    setErrorMessage('');
  } catch (error) {
    console.error('Error al obtener médicos', error);
    setErrorMessage('No se encontraron médicos para la especialidad y el día seleccionado.');
  }
};

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        background: 'linear-gradient(145deg, #6e7fcb, #4c6f9b)',
        color: '#333',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <Sidebar>
        <SidebarItem icon={<Home />} text="Inicio" active onClick={() => navigate('/mainPage')} />
        <SidebarItem icon={<Plus />} text="Crear Cita" onClick={() => navigate('/agregar')} />
      </Sidebar>

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: '30px',
        }}
      >
        <h1 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '20px' }}>
          Bienvenido, {userData ? userData.nombres : 'Cargando...'}!
        </h1>
        <p style={{ color: '#fff', fontSize: '1.2rem' }}>¡Estamos encantados de tenerte aquí! ¿Qué te gustaría hacer hoy?</p>

        <div
          style={{
            display: 'flex',
            gap: '30px',
            marginTop: '20px',
            height: '100%',
            width: '100%',
            maxWidth: '1000px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              flex: 1,
              padding: '20px',
              backgroundColor: '#fff',
              borderRadius: '15px',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
              minHeight: '200px',
            }}
          >
            <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>Historial de Citas</h3>
            <div
              style={{
                height: '700px', 
                overflowY: 'auto',
                padding: '10px',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {historialCitas.length === 0 ? (
                  <li>No tienes citas registradas.</li>
                ) : (
                  historialCitas.map((cita, index) => (
                    <li
                      key={cita.id || index}
                      style={{
                        marginBottom: '15px',
                        padding: '14px',
                        borderRadius: '10px',
                        background: '#e8edfa',
                        boxShadow: '0 2px 6px rgba(76, 111, 155, 0.08)',
                        border: '1px solid #d1d9e6',
                      }}
                    >
                      <div style={{ fontWeight: 'bold', fontSize: '1.05rem', color: '#2d3a5a' }}>
                        Especialidad: {cita.especialidad}
                      </div>
                      <div style={{ color: '#4c6f9b', fontSize: '0.98rem', marginBottom: '6px' }}>
                        Fecha: {new Date(cita.fecha).toLocaleString('es-PE', { dateStyle: 'medium', timeStyle: 'short' })}
                      </div>
                      <div style={{ color: '#333', fontSize: '0.95rem', marginBottom: '4px' }}>
                        Tipo: <span style={{ color: '#1a4d8f' }}>{cita.tipo}</span>
                      </div>
                      <div style={{ color: '#333', fontSize: '0.95rem' }}>
                        DNI Médico: <span style={{ color: '#1a4d8f' }}>{cita.medicoDni}</span>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              padding: '20px',
              backgroundColor: '#fff',
              borderRadius: '15px',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>Buscar Médico</h3>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '10px' }}>Especialidad</label>
                <select
                  value={especialidad}
                  onChange={(e) => setEspecialidad(e.target.value)}
                  style={{
                    padding: '12px',
                    width: '100%',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    boxSizing: 'border-box',
                  }}
                >
                  <option value="">Selecciona una especialidad</option>
                  {especialidades.map((esp) => (
                    <option key={esp} value={esp}>{esp}</option>
                  ))}
                </select>
              </div>

              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '10px' }}>Día</label>
                <select
                  value={dia}
                  onChange={(e) => setDia(e.target.value)}
                  style={{
                    padding: '12px',
                    width: '100%',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    boxSizing: 'border-box',
                  }}
                >
                  <option value="">Selecciona un día</option>
                  {diasSemana.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            <div
              style={{
                marginBottom: '20px',
                padding: '10px',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                height: '500px', 
                overflowY: 'auto',
              }}
            >
              <h4>Lista de Médicos</h4>
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                {medicos.length === 0 ? (
                  <li>No hay médicos disponibles para la especialidad y el día seleccionado.</li>
                ) : (
                  medicos.map((medico, index) => (
                    <li
                      key={index}
                      style={{
                        marginBottom: '18px',
                        padding: '14px',
                        borderRadius: '10px',
                        background: '#e8edfa',
                        boxShadow: '0 2px 6px rgba(76, 111, 155, 0.08)',
                        border: '1px solid #d1d9e6',
                      }}
                    >
                      <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#2d3a5a' }}>
                        {medico.nombres} {medico.apellidos}
                      </div>
                      <div style={{ color: '#4c6f9b', fontSize: '0.98rem', marginBottom: '6px' }}>
                        Especialidad: {medico.especialidad}
                      </div>
                      <div style={{ color: '#333', fontSize: '0.95rem', marginBottom: '4px' }}>
                        Email: <span style={{ color: '#1a4d8f' }}>{medico.email}</span>
                      </div>
                      <div style={{ color: '#333', fontSize: '0.95rem', marginBottom: '4px' }}>
                        Teléfono: <span style={{ color: '#1a4d8f' }}>{medico.telefono}</span>
                      </div>
                      <div style={{ color: '#333', fontSize: '0.95rem', marginTop: '8px' }}>
                        <span style={{ fontWeight: 500 }}>Horarios:</span>
                        <ul style={{ margin: 0, paddingLeft: '18px' }}>
                          {Array.isArray(medico.horario) && medico.horario.length > 0 ? (
                            medico.horario.map((h: any, idx: number) => (
                              <li key={idx} style={{ marginBottom: '2px' }}>
                                <span style={{ fontWeight: 500 }}>{h.dia}:</span>{' '}
                                {h.turnos
                                  .map(
                                    (turno: any) =>
                                      `${turno.inicio} - ${turno.fin}`
                                  )
                                  .join(', ')}
                              </li>
                            ))
                          ) : (
                            <li>No hay horarios disponibles</li>
                          )}
                        </ul>
                      </div>
                      <button
                        style={{
                          marginTop: '12px',
                          padding: '10px 18px',
                          backgroundColor: '#4c6f9b',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          width: '100%',
                        }}
                        onClick={() =>
                          navigate('/agregar', {
                            state: {
                              especialidad: medico.especialidad,
                              medicoDni: medico.dni || medico.dni_medico || medico.medicoDni || medico.id || '', // Ajusta según tu backend
                            },
                          })
                        }
                      >
                        Agendar cita
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>
            {errorMessage && <p style={{ color: 'red', marginTop: '20px' }}>{errorMessage}</p>}

            <button
              style={{
                padding: '12px 20px',
                backgroundColor: '#4c6f9b',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                width: '100%',
                fontSize: '1.1rem',
              }}
              onClick={handleBuscar}
            >
              Buscar Médicos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
