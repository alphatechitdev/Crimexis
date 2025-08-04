"use client";
import { useForm } from "react-hook-form"
import { addUserCredsTypes } from "../Types/addUser.creds.types";
import axios from "axios";
import { useState } from "react";
import './AddUser.css'


const AddUser = () => {

    const {register, handleSubmit, formState:{errors}} = useForm<addUserCredsTypes>();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [newUserId, setNewUserId] = useState("")

    const registerUser = async (userCreds:addUserCredsTypes) => {
        try {
            setIsLoading(true);
            setMessage("Adding Officer/User...")
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/registerUser`, {userCreds});
            const responseData = response.data;
            if (responseData.success) {
                setMessage("User/Officer Added successfully!");
                setNewUserId(responseData.userId);
            } else {
                setMessage("Failed to Add User/Officer!");
            }
        } catch (error) {
            console.error("Error While Registeing User!, ", error);
            setMessage("User/Officer Registration Failed!");
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className="add-user-page">
            <h1>Add User</h1>
            <div className="form-container">
            <form onSubmit={handleSubmit(registerUser)}>
                {newUserId && <strong>Your User ID: {newUserId}</strong>}
                {message && <p>{message}</p>}
                <label>Name:</label>
                <input type="text" {...register("name", {required:true})}/>
                {errors.name && <p>{errors.name.message}</p>}
                <label>Password</label>
                <input type="password" {...register("password", {required:true})}/>
                {errors.password && <p>{errors.password.message}</p>}
                <button type="submit">{isLoading ? "Adding" : "Add" }</button>
                <strong>{message}</strong>
                {isLoading && (
                    <div className="spinner"></div>
                )}
            </form>
            </div>
        </div>
    )
};

export default AddUser;