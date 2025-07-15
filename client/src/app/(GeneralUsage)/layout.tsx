

import Footer from "@/components/Footer/Footer";
import GeneralHeader from "@/components/Header/GeneralHeader";
import { ReactNode } from "react";


export default function AOLayout({children}:{children:ReactNode}) {



    return (
        <>
        <GeneralHeader/>
        {children}
        <Footer/>
        </>
    )
}