import React, { useContext } from 'react'
import AuthContext from '../context/AuthProvider'


//TODO cuidado con authProvider, quiza necesite empezar en mayuscula
const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth;