import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"


const NuevoPassword = () => {
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [passwordModificado, setPasswordModificado] = useState(false);
  
  const params = useParams();
  const { token } = params;


  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/usuarios/olvide-password/${token}`);
        setTokenValido(true)
        
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
        setTimeout(() => {
          setAlerta({})
        }, 2000);
      }
    }
    comprobarToken()
  }, [])

  

  const handleSubmit = async e => {
    e.preventDefault();
    if (password.length < 8) {
      setAlerta({
        msg: 'La contraseña debe tener al menos 8 caracteres',
        error: true
      })
      return
    }
    if (password !== repetirPassword) {
      setAlerta({
        msg: 'Las contraseñs no coinciden',
        error: true
      })
      return
    }

    try {
      const url = `/usuarios/olvide-password/${token}`
      const {data} = await clienteAxios.post(url, { password })      
      
      setPasswordModificado(true)
      setAlerta({
        msg: data.msg,
        error: false
      })
      
    } catch (error) {
      console.log(error)
    }
  }

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-blue-600 font-black text-4xl text-center capitalize">Reestablece tu Contraseña y Administra tus <span className="text-gray-700">Clientes</span> </h1>

      {msg && <Alerta alerta={alerta} />}
      {tokenValido && (
        <form
          className="my-10 bg-white shadow rounded-lg p-5"
          onSubmit={handleSubmit}
        >
          <div className="my-3">
            <label htmlFor="password" className="uppercase text-gray-700 block text-xl font-bold">Contraseña Nueva</label>
            <input
              id='password'
              type='password'
              placeholder="Contraseña de Registro"
              className="w-full mt-3 p-3 border rounded-lg bg-gray-50"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="my-3">
            <label htmlFor="password2" className="uppercase text-gray-700 block text-xl font-bold">Repetir Contraseña</label>
            <input
              id='password2'
              type='password'
              placeholder="Repite tu Contraseña"
              className="w-full mt-3 p-3 border rounded-lg bg-gray-50"
              value={repetirPassword}
              onChange={e => setRepetirPassword(e.target.value)}
            />
          </div>
          <input
            type='submit'
            value='Reestablecer'
            className="bg-blue-600 w-full py-3 rounded-lg text-white uppercase font-bold hover:bg-blue-800 cursor-pointer transition-colors mb-5"
          />

        </form>
      )}
      {passwordModificado && (<Link
          className="block text-center my-5 text-gray-500 uppercase text-md"
          to='/'
        >Inicia Sesion</Link>)}
    </>
  )
}

export default NuevoPassword