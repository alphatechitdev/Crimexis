"use client";

import { ReactNode, useEffect } from "react";
import { useAuth } from "../Context/Auth.Context";
import { useRouter } from "next/navigation";
import AuthLoadWindow from "../LoadingWindows/AuthLoadWindow";



const ProtectedRoute = ({children}:{children:ReactNode}) => {


    const {isAuthenticated} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if(isAuthenticated === false) {
          router.push('/Login')
        }
        console.log(isAuthenticated)
    }, [isAuthenticated, router]);

    if (isAuthenticated == null) {
        return <AuthLoadWindow/>
    }

    
    return (
        <div className="protected-route">
            {children}
        </div>
    )
};



export default ProtectedRoute;