import Register from "@/components/Register/Register";
import { Metadata } from "next";


export const metadata : Metadata = {
    title: "Register For Crimexis",
    icons: {
        icon:'./favicon.ico'
    }
}



export default function RegisterPage() {
    return (
        <>
        <Register/>
        </>
    )
}