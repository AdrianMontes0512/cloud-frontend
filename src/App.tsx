import { Routes,Route } from 'react-router-dom';
import Login from './pages/login';
import MainPage from './pages/mainPage';
import Add from './pages/agregar'; 
import Register from './pages/register'; 
import RegisterMedico from './pages/registerMedico';
import MainPageDoctor from './pages/mainPageDoctor';
import GenerateReceta from './pages/generateReceta';
import GenerarExamen from './pages/generarExamen';
export default function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/mainPage" element={<MainPage />} />
      <Route path='/agregar' element={<Add />} />
      <Route path='/register' element={<Register/>}/>
      <Route path='/registerMedico' element={<RegisterMedico/>}/>
      <Route path='/mainDoctor' element={<MainPageDoctor />} />
      <Route path='/generarReceta' element={<GenerateReceta />} />
      <Route path='/generarExamen' element={<GenerarExamen/>} />
    </Routes>
  );
}