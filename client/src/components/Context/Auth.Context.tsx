"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { AuthContextTypes } from "../Types/auth.context.types";
import axios from 'axios';

const AuthContext = createContext<AuthContextTypes | undefined>(undefined);

const AuthProvider  = ({children}:{children:ReactNode}) => {

    const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/protected/protected-route`, {
                    withCredentials:true
                });
                if (!response.data.success) {
                    setIsAuthenticated(false);
                } else {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error("Error While Authenticating..")
                setIsAuthenticated(false);
            }
        }  
        checkAuthentication();
    }, [])


    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth can only be used with in auth Provider")
    }

    return context;
};

export default AuthProvider;