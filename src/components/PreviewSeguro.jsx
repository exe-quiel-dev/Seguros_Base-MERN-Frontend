import { Link } from "react-router-dom";

const PreviewSeguro = ({seguro}) => {
  const { nombre, apellido, vigenciaMin, vigenciaMax, vehiculo, empresa, cobertura, pagado, _id } = seguro;

  return (
    <div className="border-b p-5 flex flex-col md:flex-row justify-between">
      <div className="flex items-center gap-2">
      <h2 className="text-xl uppercase">{nombre} {apellido}</h2>
    </div>
      <Link
        to={`${_id}`}
        className='text-gray-600 hover:text-gray-800 uppercase text-sm font-bold'
      >ver Seguro</Link>      
    </div>
  )
}

export default PreviewSeguro