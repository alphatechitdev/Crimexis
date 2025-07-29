"use client";
import { useForm } from "react-hook-form"
import { RegisterCreds } from "../Types/register.creds.types"
import axios from "axios";
import { useState } from "react";
import './Register.css'


const Register = () => {

    const {register, handleSubmit, formState:{errors}} = useForm<RegisterCreds>();
    const [otpPhase,setOTPPhase] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");



    const Register = async (creds:RegisterCreds) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {creds});
            if (response.data.sucess) {
                setOTPPhase(true);
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
    
    cons


    return(
        <div className="register-page">
            {!otpPhase ? (
            <div className="form-container">
                <form onSubmit={handleSubmit(Register)}>
                    <label>Department Name:</label>
                    <input type="text" {...register("departmentName", {required:true})}/>
                    {errors.departmentName && <p style={{color:'red'}}>{errors.departmentName.message}</p>}

                    <label>Department Office:</label>
                    <label>Department Main Office Address:</label>
                    <input type="text" {...register("departmentMainOffice.address", {required:true})}/>
                    {errors.departmentMainOffice && <p style={{color:"red"}}>{errors.departmentMainOffice.address?.message}</p>}

                    <label>Admin Office:</label>
                    <label>Admin Office Address:</label>
                    <input type="text" {...register("adminOffice.address", {required:true})}/>
                    {errors.adminOffice && <p style={{color:"red"}}>{errors.adminOffice.address?.message}</p>}

                    <label>Admin Name:</label>
                    <input type="text" {...register("adminName", {required:true})}/>
                    {errors.adminName && <p style={{color:'red'}}>{errors.adminName.message}</p>}

                    <label>Admin Email:</label>
                    <input type="email" {...register("adminEmail", {required:true})}/>
                    {errors.adminEmail && <p style={{color:'red'}}>{errors.adminEmail.message}</p>}

                    <label>Admin Phone:</label>
                    <input type="tel" {...register("adminPhone", {required:true})}/>
                    {errors.adminPhone && <p style={{color:'red'}}>{errors.adminPhone.message}</p>}


                    <label>Admin Password:</label>
                    <input type="password" {...register("adminPassword", {required:true})}/>
                    {errors.adminPassword && <p style={{color:'red'}}>{errors.adminPassword.message}</p>}

                    <button type="submit">{isLoading ? "Registering": "Regsiter"}</button>
                    {message && <p>{message}</p>}
                </form>
            </div>
              ) : (
                <div>
                    <form>
                        <label>OTP:</label>
                        <input type="text" />
                    </form>
                </div>
              )}
        </div>
    )
};

export default Register;