import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import RutaProtegida from './layouts/RutaProtegida'

import Registrar from './pages/Registrar'
import Login from './pages/Login'
import ConfirmarCuenta from './pages/ConfirmarCuenta'
import OlvidePassword from './pages/OlvidePassword'
import NuevoPassword from './pages/NuevoPassword'
import Seguro from './pages/Seguro'
import EditarSeguro from './pages/EditarSeguro'

import Seguros from './pages/Seguros'
import NuevoSeguro from './pages/NuevoSeguro'

import { AuthProvider } from './context/AuthProvider'
import { SegurosProvider } from './context/SegurosProvider'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <SegurosProvider>
          <Routes>
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path='registrar' element={<Registrar />} />
              <Route path='olvide-password' element={<OlvidePassword />} />
              <Route path='olvide-password/:token' element={<NuevoPassword />} />
              <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
            </Route>
            <Route path='/seguros' element={<RutaProtegida />}>
              <Route index element={<Seguros />} />
              <Route path='crear-seguro' element={<NuevoSeguro />} />
              <Route path=':id' element={<Seguro />} />
              <Route path='editar/:id' element={<EditarSeguro />} />
            </Route>
          </Routes>
        </SegurosProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
