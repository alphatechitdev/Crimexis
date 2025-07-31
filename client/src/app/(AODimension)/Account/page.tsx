import Account from "@/components/Account/Account";
import { Metadata } from "next";


export const metadata : Metadata = {
    title: "Account",
    icons: {
        icon:'./favicon.ico'
    }
}

export default function AccountPage() {
    return (
        <Account/>
    )
}