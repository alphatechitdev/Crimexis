import Login from "@/components/Login/Login";
import { Metadata } from "next";


export const metadata : Metadata = {
    title:"Login Crimexis",
    icons: {
        icon:'./favicon.ico'
    }
}

export default function LoginPage(){


    return(
        <Login/>
    )
}