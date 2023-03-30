import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import useSeguros from "../hooks/useSeguros";
import Alerta from "./Alerta";

const FormularioSeguro = () => {
  const [id, setId] = useState(null);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [vigenciaDesde, setVigenciaDesde] = useState('');
  const [vigenciaHasta, setVigenciaHasta] = useState('');
  const [vehiculo, setVehiculo] = useState('');
  const [cobertura, setCobertura] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [pagado, setPagado] = useState('');
  const { mostrarAlerta, alerta, submitSeguro, seguro } = useSeguros();

  const params = useParams();

  useEffect(() => {
    if(params.id) {
      setId(seguro._id)
      setNombre(seguro.nombre)
      setApellido(seguro.apellido)
      setVigenciaDesde(seguro.vigenciaDesde?.split('T')[0])
      setVigenciaHasta(seguro.vigenciaHasta?.split('T')[0])
      setVehiculo(seguro.vehiculo)
      setCobertura(seguro.cobertura)
      setEmpresa(seguro.empresa)
      setPagado(seguro.pagado)
    } else {
      console.log('nuevo proyecto')
    }
  }, [params])

  const handleSubmit = async e => {
    e.preventDefault()
    if ([nombre, apellido, vigenciaDesde, vigenciaHasta, vehiculo, cobertura, empresa, pagado].includes('')) {
      mostrarAlerta({
        msg: 'Todos los Campos son Obligatorios',
        error: true
      })
      setTimeout(() => {
        mostrarAlerta({})
      }, 2000);
      return
    }
    // PASAR LOS DATOS AL PROVIDER
    await submitSeguro({ nombre, apellido, vigenciaDesde, vigenciaHasta, vehiculo, cobertura, empresa, pagado, id })

    setId(null)
    setNombre('')
    setApellido('')
    setVigenciaDesde('')
    setVigenciaHasta('')
    setVehiculo('')
    setCobertura('')
    setEmpresa('')
    setPagado('')
    
  }

  const { msg } = alerta;

  return (
    <>

      <form
        className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
        onSubmit={handleSubmit}
        >
        {msg && <Alerta alerta={alerta}/>}
        <div className="mb-5">
          <label
            className="text-gray-700 uppercase font-bold text-sm"
            htmlFor="nombre"
          >Nombre</label>
          <input
            id='nombre'
            type='text'
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Nombre del Asegurado"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            className="text-gray-700 uppercase font-bold text-sm"
            htmlFor="apellido"
          >Apellido</label>
          <input
            id='apellido'
            type='text'
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Apellido del Asegurado"
            value={apellido}
            onChange={e => setApellido(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            className="text-gray-700 uppercase font-bold text-sm block mb-2"
            htmlFor="vigencia"
          >Vigencia</label>
          <label
            className="text-gray-500 uppercase font-bold text-sm"
            htmlFor="vigenciaDesde"
          >Desde</label>
          <input
            id='vigenciaDesde'
            type='date'
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={vigenciaDesde}
            onChange={e => setVigenciaDesde(e.target.value)}
          />
          <label
            className="text-gray-500 uppercase font-bold text-sm"
            htmlFor="vigenciaMax"
          >Hasta</label>
          <input
            id='vigenciaHasta'
            type='date'
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={vigenciaHasta}
            onChange={e => setVigenciaHasta(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            className="text-gray-700 uppercase font-bold text-sm"
            htmlFor="vehiculo"
          >Vehiculo</label>
          <input
            id='vehiculo'
            type='text'
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Vehiculo del Asegurado"
            value={vehiculo}
            onChange={e => setVehiculo(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            className="text-gray-700 uppercase font-bold text-sm"
            htmlFor="cobertura"
          >Cobertura</label>
          <input
            id='cobertura'
            type='text'
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Tipo de Cobertura"
            value={cobertura}
            onChange={e => setCobertura(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            className="text-gray-700 uppercase font-bold text-sm"
            htmlFor="empresa"
          >Empresa</label>
          <input
            id='empresa'
            type='text'
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Empresa Aseguradora"
            value={empresa}
            onChange={e => setEmpresa(e.target.value)}
          />
        </div>
        <div className="mb-5 flex items-center">
          <label
            className="text-gray-700 uppercase font-bold text-sm mx-10"
            htmlFor="pagado"
          >Pagado</label>
          <label
            className="text-gray-700 uppercase font-bold text-sm"
            htmlFor="si"
          >Si</label>
          <input
            id='si'
            type='radio'
            name='pagado'
            className="border mx-5 p-2 placeholder-gray-400 rounded-md"
            value='Si'
            onChange={e => setPagado(e.target.value)}
            checked={pagado == 'Si'}
          />
          <label
            className="text-gray-700 uppercase font-bold text-sm"
            htmlFor="no"
          >No</label>
          <input
            id='no'
            type='radio'
            name='pagado'
            className="border mx-5 p-2 placeholder-gray-400 rounded-md"
            value='No'
            onChange={e => setPagado(e.target.value)}
            checked={pagado == 'No'}
          />
        </div>
        <input
          type='submit'
          value={id ? 'Actualizar Seguro' : 'Crear Seguro'}
          className="bg-blue-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-blue-800 transition-colors"
        />
      </form>
    </>
  )
}

export default FormularioSeguro