import { useEffect } from "react";
import { useParams, Link } from "react-router-dom"
import useSeguros from "../hooks/useSeguros";

let socket;

const Seguro = () => {
  const params = useParams();
  const { obtenerSeguro, seguro, cargando, eliminarSeguro } = useSeguros();

  const { nombre, apellido, vehiculo, empresa, cobertura, vigenciaDesde, vigenciaHasta, pagado } = seguro;

  useEffect(() => {
    obtenerSeguro(params.id)
  }, [])

  const handleClick = () => {
    if (confirm('¿Deseas Eliminar este Seguro?')) {
      eliminarSeguro(params.id)
    } else {
      console.log('No')
    }
  }

  return (
    cargando ? 'cargando...' : (
      <div className="flex justify-between items-center flex-col md:flex-row bg-white rounded-lg shadow-xl p-5">
        <div className="mb-10 md:mb-0">
          <h1 className="font-black text-3xl">{nombre} {apellido}</h1>
          <p className="my-2"><span className="font-bold text-lg ">Vehiculo:</span> {vehiculo}</p>
          <p className="my-2"><span className="font-bold text-lg ">Empresa:</span> {empresa}</p>
          <p className="my-2"><span className="font-bold text-lg ">Cobertura:</span> {cobertura}</p>
          <p className="my-2"><span className="font-bold text-lg ">Vigencia:</span> {vigenciaDesde} - {vigenciaHasta}</p>
          <p><span className="font-bold text-lg ">Pagado:</span> {pagado}</p>
        </div>

        <div className="flex gap-5 md:flex-col md:p-5 lg:flex-row">
          <div className="flex items-center gap-2 hover:text-white my-3 md:my-0 bg-blue-300 hover:bg-blue-600 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            </svg>
            <Link
              to={`/seguros/editar/${params.id}`}
              className='uppercase font-bold'
            >Editar</Link>
          </div>

          <div className="flex items-center gap-2 hover:text-white my-3 md:my-0 bg-red-300 hover:bg-red-600 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>

            <button
              className='uppercase font-bold'
              onClick={handleClick}
            >Eliminar</button>
          </div>
        </div>
      </div>
    )
  )
}

export default Seguro