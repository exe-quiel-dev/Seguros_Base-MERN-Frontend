import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth";
import useSeguros from "../hooks/useSeguros"
import Busqueda from "./Busqueda";

const Header = () => {
  const { handleBuscador,cerrarSesionSeguros } = useSeguros();
  const { cerrarSesionAuth } = useAuth();
  
  const handleCerrarSesion = () => {
    cerrarSesionAuth()
    cerrarSesionSeguros()
    localStorage.removeItem('token')
  }
  
  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-blue-600 font-black text-center mb-5 md:mb-0">Seguros Base</h2>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <button
            type="button"
            className="font-bold uppercase"
            onClick={handleBuscador}
          >Buscar Seguro</button>
          <Link to='/seguros' className="font-bold uppercase">Seguros</Link>
          <button
            type='button'
            className="text-white text-sm bg-blue-600 hover:bg-blue-800 p-3 rounded-md uppercase font-bold transition-colors"
            onClick={handleCerrarSesion}
          >Cerrar Sesion</button>
        </div>
        <Busqueda />
      </div>
    </header>
  )
}

export default Header