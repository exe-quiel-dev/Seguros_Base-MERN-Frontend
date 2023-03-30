import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
import useAuth from "../hooks/useAuth"


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // TODO: mover alerta a su propio context
  const [alerta, setAlerta] = useState({});

  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if(auth._id) navigate('/proyectos');
  // }, [auth])

  const handleSubmit = async e => {
    e.preventDefault();

    if([email, password].includes('')) {
      setAlerta({
        msg: 'Todos los Campos son Obligatorios',
        error: true 
      })
      return
    }

    try {
      const { data } = await clienteAxios.post('/usuarios/login', { email, password });
      localStorage.setItem('token', data.token);
      setAlerta({})
      setAuth(data)
      navigate('/seguros')

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-blue-600 font-black text-4xl text-center capitalize">Inicia sesion y Administra tus <span className="text-gray-700">Clientes</span> </h1>

      {msg && <Alerta alerta={alerta}/> }
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
        <div className="my-3">
          <label htmlFor="password" className="uppercase text-gray-700 block text-xl font-bold">Contraseña</label>
          <input 
            id='password'
            type='password'
            placeholder="Contraseña de Registro"
            className="w-full mt-3 p-3 border rounded-lg bg-gray-50"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <input 
          type='submit'
          value='Iniciar Sesion'
          className="bg-blue-600 w-full py-3 rounded-lg text-white uppercase font-bold hover:bg-blue-800 cursor-pointer transition-colors mb-5"
        />

      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-gray-500 uppercase text-sm"
          to='/registrar'
        >No tienes una Cuenta? Registrate</Link>
        <Link
          className="block text-center my-5 text-gray-500 uppercase text-sm"
          to='/olvide-password'
        >Olvide mi Contraseña</Link>
      </nav>
    </>
  )
}

export default Login