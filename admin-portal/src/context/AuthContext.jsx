import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";


const authContext=createContext();


const AuthProvider=({children})=>{
    const [user, setuser] = useState(null)
    const navigate=useNavigate()
    const value={
        user,
        setuser,
        navigate
    }
    return(
        <authContext.Provider value={value}>
            {children}
        </authContext.Provider>
    )
}

export {authContext,AuthProvider}