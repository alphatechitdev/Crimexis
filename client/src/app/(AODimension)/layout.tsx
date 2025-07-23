import AuthProvider from "@/components/Context/Auth.Context";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ProtectedRoute from "@/components/Protected/ProtectedRoute";
import { ReactNode } from "react";


export default function AOLayout({children}:{children:ReactNode}) {



    return (
        <>
        <AuthProvider>
            <ProtectedRoute>
                <Header/>
                {children}
                <Footer/>
            </ProtectedRoute>
        </AuthProvider>
        </>
    )
}