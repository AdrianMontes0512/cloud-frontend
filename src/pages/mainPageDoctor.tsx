import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../utilities/sidebar';
import { SidebarItem } from '../utilities/sidebaritem';
import { Home, Plus } from 'lucide-react';
import { obtenerCitasPorDoctor } from '../services/orquestador'; 

export default function MainPageDoctor() {
  const [historialCitas, setHistorialCitas] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>(null); 
  const [, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const doctorId = localStorage.getItem('usuario') ? JSON.parse(localStorage.getItem('usuario') || '').dni : ''; 

  useEffect(() => {
    const fetchData = async () => {
      const storedUser = localStorage.getItem('usuario');
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
      }

      try {
        const response = await obtenerCitasPorDoctor(doctorId);
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
  }, [doctorId]);

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
        <SidebarItem icon={<Home />} text="Inicio" active onClick={() => navigate('/mainDoctor')} />
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
                  <li>No tienes citas pendientes.</li>
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
                        Fecha:{' '}
                        {new Date(cita.fecha).toLocaleString('es-PE', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </div>
                      <div style={{ color: '#333', fontSize: '0.95rem', marginBottom: '4px' }}>
                        Tipo: <span style={{ color: '#1a4d8f' }}>{cita.tipo}</span>
                      </div>
                      <div style={{ color: '#333', fontSize: '0.95rem', marginBottom: '4px' }}>
                        DNI Paciente: <span style={{ color: '#1a4d8f' }}>{cita.pacienteDni}</span>
                      </div>
                      <div style={{ color: '#333', fontSize: '0.95rem' }}>
                        ID Cita: <span style={{ color: '#1a4d8f' }}>{cita.id}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                        <button
                          style={{
                            flex: 1,
                            padding: '10px 8px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                          }}
                          onClick={() =>
                            navigate('/generarReceta', {
                              state: {
                                idCita: cita.id,
                                idDoctor: cita.medicoDni,
                                idPaciente: cita.pacienteDni,
                              },
                            })
                          }
                        >
                          Generar Receta
                        </button>
                        <button
                          style={{
                            flex: 1,
                            padding: '10px 8px',
                            backgroundColor: '#2196F3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                          }}
                          onClick={() =>
                            navigate('/generarExamen', {
                              state: {
                                idCita: cita.id,
                                idDoctor: cita.medicoDni,
                                idPaciente: cita.pacienteDni,
                                especialidad: cita.especialidad,
                              },
                            })
                          }
                        >
                          Exámenes
                        </button>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
