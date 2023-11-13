import React, { useState, useEffect, createContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        authUser();
    }, []);

    const authUser = async () => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if (!token || !user) {
            setLoading(false);
            return false
        }

        const userObj = JSON.parse(user)
        const userId = userObj.id;

        const request = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/users/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": token
            }
        });

        const { data } = await request.json();

        setAuth(data);
        setLoading(false);

    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;