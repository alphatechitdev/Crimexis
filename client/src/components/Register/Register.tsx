"use client";
import { useForm } from "react-hook-form"
import { RegisterCreds } from "../Types/register.creds.types"
import axios from "axios";
import { useState } from "react";
import './Register.css'



const Register = () => {

    const {register, handleSubmit, formState:{errors}} = useForm<RegisterCreds>();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");


    const Register = async (creds:RegisterCreds) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {creds});
            if (response.data.sucess) {
                setMessage("Registration Successful");
            } else {
                setMessage("Registration Successful");

            }
        } catch (error) {
            console.error("Error While Registering User, ", error);
        } finally {
            console.log("Registration Successful");
        }
    }


    return(
        <div className="register-page">
            <div className="form-container">
                <form onSubmit={handleSubmit(Register)}>
                    <label>Name:</label>
                    <input type="text" {...register("name", {required:true})}/>
                    {errors.name && <p style={{color:'red'}}>{errors.name.message}</p>}

                    <label>Password:</label>
                    <input type="password" {...register("password", {required:true})}/>
                    {errors.password && <p style={{color:'red'}}>{errors.password.message}</p>}

                    <button type="submit">{isLoading ? "Registering": "Regsiter"}</button>
                    {message && <p>{message}</p>}
                </form>
            </div>
        </div>
    )
};

export default Register;