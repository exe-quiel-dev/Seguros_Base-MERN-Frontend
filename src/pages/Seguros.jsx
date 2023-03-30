import { useEffect } from "react";
import useSeguros from "../hooks/useSeguros"
import PreviewSeguro from "../components/PreviewSeguro";


const Seguros = () => {
  const { seguros } = useSeguros();


  return (
    <>
      <h1 className="text-3xl font-black">Seguros</h1>
      <div className="bg-white shadow mt-10 rounded-lg">
        {seguros.length ? 
          seguros.map(seguro => (
            <PreviewSeguro key={seguro._id} seguro={seguro}/>
          )) 
        : <p className=" text-gray-700 uppercase text-center p-3">No hay seguros aun</p>}
      </div>
    </>
  )
}

export default Seguros