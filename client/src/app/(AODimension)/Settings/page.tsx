import Settings from "@/components/Settings/Settings";
import { Metadata } from "next";


export const metadata : Metadata = {
    title: "Settings",
    icons: {
        icon:'./favicon.ico'
    }
}

export default function SettingsPage () {

    return (
        <Settings/>
    )
}