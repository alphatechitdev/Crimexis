import Hotspots from "@/components/MLAI/Hotspots/Hotspots";
import { Metadata } from "next";


export const metadata : Metadata = {
    title: "Hotspots",
    icons: {
        icon:'./favicon.ico'
    }
}

export default function HotspotsPage() {
    return (
        <Hotspots/>
    )
};