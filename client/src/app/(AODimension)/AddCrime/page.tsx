import AddCrime from "@/components/AddCrime/AddCrime";
import { Metadata } from "next";


export const metadata : Metadata = {
    title: "Add Crime",
    icons: {
        icon:'./favicon.ico'
    }
}



export default function AddCrimePage() {
    return (
        <AddCrime/>
    )
}