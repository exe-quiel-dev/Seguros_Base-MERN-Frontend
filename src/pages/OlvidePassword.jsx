import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";


const OlvidePassword = () => {
  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if(email === '' || email.length < 6) {
      setAlerta({
        msg: 'El email es obligatorio',
        error: true
      })
      return
    }

    try {
      const { data } = await clienteAxios.post(`/usuarios/olvide-password`, { email });
      
      setAlerta({
        msg: data.msg,
        error: false
      })
      setTimeout(() => {
        setAlerta({})
      }, 2000);
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

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-blue-600 font-black text-4xl text-center capitalize">Recupera tu Acceso y Administra tus <span className="text-gray-700">Clientes</span> </h1>

      {msg && <Alerta alerta={alerta} />}
      <form 
        className="my-10 bg-white shadow rounded-lg p-5"
        onSubmit={handleSubmit}
      >

        <div className="my-3">
          <label htmlFor="email" className="uppercase text-gray-700 block text-xl font-bold">Email</label>
          <input
            id='email'
            type='email'
            placeholder="Email de Registro"
            className="w-full mt-3 p-3 border rounded-lg bg-gray-50"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <input
          type='submit'
          value='Recuperar Contraseña'
          className="bg-blue-600 w-full py-3 rounded-lg text-white uppercase font-bold hover:bg-blue-800 cursor-pointer transition-colors mb-5"
        />

      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-gray-500 uppercase text-sm"
          to='/'
        >Ya tienes una cuenta? Inicia Sesion</Link>
        <Link
          className="block text-center my-5 text-gray-500 uppercase text-sm"
          to='/registrar'
        >No tienes una Cuenta? Registrate</Link>
      </nav>
    </>
  )
}

export default OlvidePassword