import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";

const SegurosContext = createContext();

const SegurosProvider = ({ children }) => {
  const [seguros, setSeguros] = useState([]);
  const [seguro, setSeguro] = useState({});
  const [alerta, setAlerta] = useState({});
  const [cargando, setCargando] = useState(false);
  const [buscador, setBuscador] = useState(false);

  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    const obtenerSeguros = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
        const { data } = await clienteAxios('/seguros', config);
        setSeguros(data)

      } catch (error) {
        console.log(error)
      }
    }
    obtenerSeguros()
  }, [auth])

  const mostrarAlerta = alerta => {
    setAlerta(alerta)
  }

  const nuevoSeguro = async seguro => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.post('/seguros', seguro, config);
      setSeguros([...seguros, data])
      setAlerta({
        msg: 'Seguro Agregado Correctamente',
        error: false
      })

    } catch (error) {
      console.log(error)
    }
    setTimeout(() => {
      setAlerta({})
      navigate('/seguros')
    }, 2000);
  }

  const editarSeguro = async seguro => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.put(`/seguros/${seguro.id}`, seguro, config);

      // SINCRONIZAR EL STATE
      const segurosActualizados = seguros.map(seguroState => seguroState._id === data._id ? data : seguroState);

      setSeguros(segurosActualizados)

      setAlerta({
        msg: 'Seguro Actualizado Correctamente',
        error: false
      })

      setTimeout(() => {
        setAlerta({})
        navigate('/seguros')
      }, 2000);

    } catch (error) {
      console.log(error)
    }
  }

  const submitSeguro = async seguro => {
    if (seguro.id) {
      await editarSeguro(seguro)
    } else {
      await nuevoSeguro(seguro)
    }

  }

  const obtenerSeguro = async id => {
    setCargando(true)
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios(`/seguros/${id}`, config);
      setSeguro(data)

    } catch (error) {
      console.log(error)
    } finally {
      setCargando(false)
    }
  }

  const eliminarSeguro = async id => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.delete(`/seguros/${id}`, config);
      
      // SINCRONIZAR EL STATE
      const segurosActualizados = seguros.filter(seguroState => seguroState._id !== id);
      setSeguros(segurosActualizados)

      setAlerta({
        msg: data.msg,
        error: false
      })

      setTimeout(() => {
        setAlerta({})
        navigate('/seguros')
      }, 2000);
    } catch (error) {
      console.log(error)
    }
  }

  const handleBuscador = () => {
    setBuscador(!buscador)
  }

  const cerrarSesionSeguros = () => {
    setSeguros([])
    setSeguro({})
    setAlerta({})

  }

  return (
    <SegurosContext.Provider
      value={{
        seguros,
        setSeguros,
        mostrarAlerta,
        alerta,
        submitSeguro,
        obtenerSeguro,
        seguro,
        cargando,
        eliminarSeguro,
        buscador,
        handleBuscador,
        cerrarSesionSeguros
      }}
    >
      {children}
    </SegurosContext.Provider>
  )
}

export {
  SegurosProvider
}
export default SegurosContext