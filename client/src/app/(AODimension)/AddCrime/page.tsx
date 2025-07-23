import AddCrime from "@/components/AddCrime/AddCrime";
import { Metadata } from "next";

export const metadata : Metadata = {
    title:"Add Crime"
}


export default function AddCrimePage() {
    return (
        <AddCrime/>
    )
}