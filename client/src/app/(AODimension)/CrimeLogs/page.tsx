import CrimeLogs from "@/components/CrimeLogs/CrimeLogs";
import { Metadata } from "next";


export const metadata : Metadata = {
    title:"Crime Logs"
}

export default function CrimeLogsPage(){

    return (
        <CrimeLogs/>
    )
}