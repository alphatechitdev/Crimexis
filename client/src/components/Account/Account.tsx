"use client";
import { useEffect, useState } from "react"
import { RegisterCreds } from "../Types/register.creds.types";
import axios from "axios";
import { useAuth } from "../Context/Auth.Context";
import Link from "next/link";
import './Account.css';

const Account = () => {
    const [accountData, setAccountData] = useState<RegisterCreds>();
    const { userId } = useAuth();

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
    }, [userId]);

    useEffect(() => {
        if (accountData) {
        alert(`Use This UserId For Login: ${accountData?.adminUserId}`)
        }
    }, [accountData])


    return (
        <div className="account-page">
            {userId?.includes("ADM") &&
                <div className="add-user">
                    <Link href='/Account/AddUser'><button>Add User/Officer</button></Link>
                </div>
            }

            <div className="account-status">
                <h1>Account Status</h1>
                <strong>{accountData?.accountStatus ? "✅ Verified" : "⏳ In Process"}</strong>
            </div>

            <div className="account-info-box">
                <h2>Admin Account Information</h2>
                <p><strong>User ID:</strong> {accountData?.adminUserId}</p>
                <p><strong>Name:</strong> {accountData?.adminName}</p>
                <p><strong>Email:</strong> {accountData?.adminEmail}</p>
                <p><strong>Phone:</strong> {accountData?.adminPhone}</p>
                <p><strong>Department:</strong> {accountData?.departmentName}</p>
                <p><strong>Main Office Address:</strong> {accountData?.departmentMainOffice?.address}</p>
                <p><strong>Admin Office Address:</strong> {accountData?.adminOffice?.address}</p>
                <p><strong>Honesty Check:</strong> {accountData?.adminHonestCheck}</p>
            </div>

            <div className="change-password-section">
                <h3>Need to update your password?</h3>
                <Link href="/Account/ChangePassword">
                    <button className="change-password-btn">Change Password</button>
                </Link>
            </div>
        </div>
    );
};

export default Account;
