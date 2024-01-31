import { useContext } from "react"
import { GlobalStateContext } from "../context/GlobalStateContext"

const useGlobalState = () => {
    const context = useContext(GlobalStateContext)
    return context;
}
export default useGlobalState