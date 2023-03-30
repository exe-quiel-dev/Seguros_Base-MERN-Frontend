

const Alerta = ({alerta}) => {
  return (
    <div className={`${alerta.error ? 'from-red-600 to-red-700' : 'from-blue-400 to-blue-600'} bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm m-10`}>
      {alerta.msg}
    </div>
  )
}

export default Alerta