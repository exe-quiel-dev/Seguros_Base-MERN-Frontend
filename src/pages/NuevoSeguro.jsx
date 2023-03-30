import FormularioSeguro from "../components/FormularioSeguro"

const NuevoSeguro = () => {
  return (
    <>
      <h1 className="text-3xl font-black">Ingresar Nuevo Seguro</h1>
      <div className="mt-10 flex justify-center">
        <FormularioSeguro />
      </div>
    </>
  )
}

export default NuevoSeguro