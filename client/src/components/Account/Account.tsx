"use client";
import { useEffect, useState } from "react"
import { RegisterCreds } from "../Types/register.creds.types";
import axios from "axios";
import { useAuth } from "../Context/Auth.Context";

const Account = () => {
    const [accountData, setAccountData] = useState<RegisterCreds>();
    const {userId} = useAuth();

    const fetchAccountData = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/account/fetchAccountData?userId=${userId}`);
            const responseData = response.data;
            setAccountData(responseData.accountDetails);
        } catch (error) {
            console.error("Error While fetching Account Data, ", error);
        }
    }

    useEffect(() => {
        if (userId) {
            fetchAccountData();
        }
    }, [userId])

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