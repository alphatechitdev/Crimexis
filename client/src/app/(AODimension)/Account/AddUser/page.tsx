import AddUser from "@/components/AddUser/AddUser"
import { Metadata } from "next"
 

export const metadata : Metadata = {
    title: "Add User/Officer",
    icons: {
        icon:'./favicon.ico'
    }
}

export default function AddUserPage () {
    return (
        <AddUser/>
    )
}