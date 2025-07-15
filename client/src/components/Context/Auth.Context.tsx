import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { AuthContextTypes } from "../Types/auth.context.types";
import axios from 'axios';

const AuthContext = createContext<AuthContextTypes | undefined>(undefined);

const AuthProvider  = ({children}:{children:ReactNode}) => {

    const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/protected/protected-route`)
            } catch (error) {
                console.error("Error While ")
            }
        }   
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