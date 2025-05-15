import axios from 'axios';

export const API_ORQUESTADOR = axios.create({
  baseURL: 'http://proyectocloudc-628467818.us-east-1.elb.amazonaws.com:8002', // Asegúrate de usar la URL correcta
  headers: {
    'Content-Type': 'application/json',
  },
});
//proyectocloudc-628467818.us-east-1.elb.amazonaws.com:8002
// **POST /orquestador/citas** - Crear una nueva cita médica
export const crearCita = async (citaData: {
  especialidad: string;
  fecha_hora: string;
  iddoctor: string;
  idpaciente: string;
  tipo: string;
}) => {
  try {
    const response = await API_ORQUESTADOR.post('/orquestador/citas', citaData);
    return response.data; // Cita creada correctamente
  } catch (error) {
    console.error('Error al crear cita', error);
    throw error;
  }
};

// **GET /orquestador/citas/doctor/{iddoctor}** - Obtener todas las citas de un doctor
export const obtenerCitasPorDoctor = async (iddoctor: string) => {
  try {
    const response = await API_ORQUESTADOR.get(`/orquestador/citas/doctor/${iddoctor}`);
    return response.data; // Devuelve las citas del doctor
  } catch (error) {
    console.error('Error al obtener citas del doctor', error);
    throw error;
  }
};


export const obtenerCitasDeHoy = async () => {
  try {
    const response = await API_ORQUESTADOR.get('/orquestador/citas/hoy');
    return response.data;
  } catch (error) {
    console.error('Error al obtener citas de hoy', error);
    throw error;
  }
};

export const obtenerCitasPorPaciente = async (idpaciente: string) => {
  try {
    const response = await API_ORQUESTADOR.get(`/orquestador/citas/paciente/${idpaciente}`);
    return response.data; 
  } catch (error) {
    console.error('Error al obtener citas del paciente', error);
    throw error;
  }
};

export const obtenerCitaPorId = async (idcita: string) => {
  try {
    const response = await API_ORQUESTADOR.get(`/orquestador/citas/${idcita}`);
    return response.data; 
  } catch (error) {
    console.error('Error al obtener la cita por ID', error);
    throw error;
  }
};

export const generarReceta = async (recetaData: {
  diagnostico: string;
  duracion: string;
  idcita: string;
  iddoctor: string;
  idpaciente: string;
  medicamentos: string;
  observaciones: string;
  requiere_examen_medico: boolean;
}) => {
  try {
    const response = await API_ORQUESTADOR.post('/orquestador/generarreceta', recetaData);
    return response.data; 
  } catch (error) {
    console.error('Error al generar receta', error);
    throw error;
  }
};


export const obtenerRecetaPorCita = async (idcita: string) => {
  try {
    const response = await API_ORQUESTADOR.get(`/orquestador/recetas/cita/${idcita}`);
    return response.data; // Devuelve la receta encontrada
  } catch (error) {
    console.error('Error al obtener receta por cita', error);
    throw error;
  }
};

// **GET /orquestador/recetas/paciente/{idpaciente}** - Obtener recetas por ID de paciente
export const obtenerRecetasPorPaciente = async (idpaciente: string) => {
  try {
    const response = await API_ORQUESTADOR.get(`/orquestador/recetas/paciente/${idpaciente}`);
    return response.data; // Devuelve las recetas del paciente
  } catch (error) {
    console.error('Error al obtener recetas del paciente', error);
    throw error;
  }
};

// **POST /orquestador/examenes** - Crear un examen médico orquestado
export const crearExamen = async (examenData: {
  citaId: string;
  descripcion: string;
  medicoId: string;
  pacienteId: string;
  resultado: string;
  diagnostico: string;
  especialidad: string;
  fechaSolicitud: string;

}) => {
  try {
    const response = await API_ORQUESTADOR.post('/orquestador/examenes', examenData);
    return response.data; // Examen creado correctamente
  } catch (error) {
    console.error('Error al crear examen', error);
    throw error;
  }
};

// **GET /orquestador/examenes/buscar** - Buscar exámenes médicos
export const buscarExamenes = async (filtros: {
  pacienteId?: string;
  citaId?: string;
  medicoId?: string;
}) => {
  try {
    const response = await API_ORQUESTADOR.get('/orquestador/examenes/buscar', { params: filtros });
    return response.data; // Lista de exámenes encontrados
  } catch (error) {
    console.error('Error al buscar exámenes', error);
    throw error;
  }
};

// **GET /orquestador/examenes/paciente/{pacienteId}** - Obtener exámenes médicos de un paciente
export const obtenerExamenesPorPaciente = async (pacienteId: string) => {
  try {
    const response = await API_ORQUESTADOR.get(`/orquestador/examenes/paciente/${pacienteId}`);
    return response.data; // Lista de exámenes encontrados
  } catch (error) {
    console.error('Error al obtener exámenes del paciente', error);
    throw error;
  }
};

// **POST /orquestador/personas/medico** - Crear un nuevo médico
export const crearMedico = async (medicoData: {
  apellidos: string;
  colegiatura: string;
  direccion: string;
  dni: string;
  email: string;
  especialidad: string;
  fechaNacimiento: string;
  horario: { dia: string; turnos: { inicio: string; fin: string }[] }[];
  nombres: string;
  password: string;
  sexo: string;
  telefono: string;
}) => {
  try {
    const response = await API_ORQUESTADOR.post('/orquestador/personas/medico', medicoData);
    return response.data; // Médico creado correctamente
  } catch (error) {
    console.error('Error al crear médico', error);
    throw error;
  }
};

// **GET /orquestador/personas/medico/dni/{dni}** - Obtener información básica de un médico por DNI
export const obtenerMedicoPorDni = async (dni: string) => {
  try {
    const response = await API_ORQUESTADOR.get(`/orquestador/personas/medico/dni/${dni}`);
    return response.data; // Información básica del médico encontrada
  } catch (error) {
    console.error('Error al obtener médico por DNI', error);
    throw error;
  }
};

// **GET /orquestador/personas/medico/{id}** - Obtener información básica de un médico por ID
export const obtenerMedicoPorId = async (id: string) => {
  try {
    const response = await API_ORQUESTADOR.get(`/orquestador/personas/medico/${id}`);
    return response.data; // Información básica del médico encontrada
  } catch (error) {
    console.error('Error al obtener médico por ID', error);
    throw error;
  }
};

// **GET /orquestador/personas/medicos** - Buscar médicos
export const buscarMedicos = async (especialidad: string, dia: string) => {
  try {
    const response = await API_ORQUESTADOR.get('/orquestador/personas/medicos', { params: { especialidad, dia } });
    return response.data; // Lista de médicos encontrados
  } catch (error) {
    console.error('Error al buscar médicos', error);
    throw error;
  }
};

export const crearPaciente = async (pacienteData: {
  apellidos: string;
  direccion: string;
  dni: string;
  email: string;
  estadoCivil: string;
  fechaNacimiento: string;
  nombres: string;
  password: string;
  seguroSalud: boolean;
  sexo: string;
  telefono: string;
  tipoSangre: string;
}) => {
  try {
    const response = await API_ORQUESTADOR.post('/orquestador/personas/paciente', pacienteData);
    return response.data; 
  } catch (error) {
    console.error('Error al crear paciente', error);
    throw error;
  }
};

export const obtenerPacientePorDni = async (dni: string) => {
  try {
    const response = await API_ORQUESTADOR.get(`/orquestador/personas/paciente/dni/${dni}`);
    return response.data; 
  } catch (error) {
    console.error('Error al obtener paciente por DNI', error);
    throw error;
  }
};
