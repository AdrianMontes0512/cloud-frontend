import { Routes,Route } from 'react-router-dom';
import Login from './pages/login';
import MainPage from './pages/mainPage';
import Add from './pages/agregar'; 
import Register from './pages/register'; 
import RegisterMedico from './pages/registerMedico';
export default function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/mainPage" element={<MainPage />} />
      <Route path='/agregar' element={<Add />} />
      <Route path='/register' element={<Register/>}/>
      <Route path='/registerMedico' element={<RegisterMedico/>}/>
    </Routes>
  );
}