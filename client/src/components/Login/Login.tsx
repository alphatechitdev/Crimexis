"use client";
import {useForm} from 'react-hook-form';
import { LoginCredsTypes } from '../Types/login.creds.types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import './Login.css';

const Login = () => {

    const {register, handleSubmit, formState:{errors} } = useForm<LoginCredsTypes>();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");


    const router = useRouter();




    const Login  = async (creds:LoginCredsTypes) => {
        try {
            setIsLoading(true);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {creds}, {
                withCredentials:true
            });
            if(response.data.success) {
                setMessage("Login Successful!")
                router.push('/Dashboard');
            } else {
                setMessage("Invalid Credentials!");
            }
        } catch (error) {
            setMessage("Login Failed! Try Again!")
            console.error("Error While Logging In, ", error)
        } finally {
            setIsLoading(false);
        }
    }



    return (
        <div className="login-page">
            <div className='form-container'>
            <form onSubmit={handleSubmit(Login)}>
                <label>UserId/RegId:</label>
                <input type='text' {...register("userId", {required:true})}/>
                {errors.userId && <p style={{color:"red"}}>{errors.userId.message}</p>}

                <label>Password:</label>
                <input type='password' {...register("password", {required:true})}/>
                {errors.password && <p style={{color:"red"}}>{errors.password.message}</p>}

                <button type="submit">{isLoading ? "Logging In" : "Login"}</button>
                {message && <p>{message}</p>}
            </form>
               </div>
        </div>
    )
};

export default Login;