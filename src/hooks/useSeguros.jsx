import { useContext } from "react";
import SegurosContext from "../context/SegurosProvider";

const useSeguros = () => {
  return useContext(SegurosContext)
}

export default useSeguros