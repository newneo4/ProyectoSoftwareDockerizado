import { AuthContext } from "@/shared/context/AuthContext"
import { useContext } from "react"
import { Navigate } from "react-router-dom"

const PrivateRoute = ({children}) => {
  
    const { currentUser } = useContext(AuthContext);

    return currentUser ? children : <Navigate to="/" />;
}

export default PrivateRoute