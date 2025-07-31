import Dashboard from "@/components/Dashboard/Dashboard";
import { Metadata } from "next";

export const metadata : Metadata = {
    title: "Dashboard",
    icons: {
        icon:'./favicon.ico'
    }
}

export default function DashboardPage() {


    return (
        <Dashboard/>
    )
}