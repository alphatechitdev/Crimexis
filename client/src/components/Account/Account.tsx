import { useState } from "react"
import { RegisterCreds } from "../Types/register.creds.types";
import axios from "axios";

const Account = () => {
    const [accountData, setAccountData] = useState<RegisterCreds>();
    const 
    const fetchAccountData = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/account/fetchAccountData?userId=${}`);
            const responseData = response.data;
            setAccountData(responseData.account);
        } catch (error) {
            console.error("Error While fetching Account Data, ", error);
        }
    }

    return (
        <div className="account-page">
            <div className="account-status">
                <h1>Account Status</h1>
                <strong>{accountData?.accountStatus ? "Verified": "In Process"}</strong>
            </div>
            <h1>Your UserId: {accountData?.adminUserId}</h1>
        </div>
    )
};


export default Account;