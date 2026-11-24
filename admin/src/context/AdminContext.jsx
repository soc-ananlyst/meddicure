import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const AdminContext = createContext()


const AdminContextProvider = (props)=>{
    const [token,setToken] = useState('')
    const backendURL = 'https://meddicure-gtfb.vercel.app'
    const navigate  = useNavigate()
    const [showSidebar,setShowSidebar] = useState(false)
    const [currentPage,setCurrentPage] = useState('')


    useEffect(()=>{
        if(!token)
        {
            setToken(localStorage.getItem('token'))
        }
    },[token])




    const values = {backendURL,token,setToken,navigate,showSidebar,setShowSidebar,currentPage,setCurrentPage}



    return(
        <AdminContext.Provider value={values}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider