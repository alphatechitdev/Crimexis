"use client";
import { useForm } from "react-hook-form"
import { RegisterCreds } from "../Types/register.creds.types"
import axios from "axios";
import { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";

import './Register.css'
import { auth } from "../Lib/Firebase";

interface Window {
  recaptchaVerifier?: RecaptchaVerifier;
  confirmationResult?: ConfirmationResult;
}


const Register = () => {

    const {register, handleSubmit, formState:{errors}} = useForm<RegisterCreds>();
    const [otpPhase,setOTPPhase] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [otp, setOtp] = useState('');
    const [credsPhone, setCredsPhone] = useState<RegisterCreds["adminPhone"]>("");
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);


    const sendOTP = async () => {
        try {
            if (window.recaptchaVerifier) {
                window.recaptchaVerifier.clear();
            }
            window.recaptchaVerifier = new RecaptchaVerifier(auth,"recaptcha-container", {
                size:'invisible',
                callback : (response) => {
                    console.log("reCAPTCHA verified")
                }
            });
            alert(credsPhone);

            const confirmation = await signInWithPhoneNumber(auth, credsPhone, window.recaptchaVerifier);
            setConfirmationResult(confirmation)
        } catch (error) {
            console.error("Error While Sending OTP, ", error);
        }
    };

    const verifyOTP = async () => {
        try {
            if (!confirmationResult) {
                console.error("Confirmation result is null");
                return;
            }
            const result = await confirmationResult.confirm(otp);
            const user = result.user;
            const idToken = await user.getIdToken();
        } catch (error) {
            setMessage("Invalid OTP!")
        }
    }



    const Register = async (creds:RegisterCreds) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/registerAdmin`, {creds});
            if (response.data.success) {
                alert(`Register  ${creds.adminPhone}`)
                setCredsPhone(creds.adminPhone);
                await sendOTP()
                setTimeout(() => {
                    setOTPPhase(true);
                }, 5000);

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

                    <label>Admin Phone: (For OTP & Verification )</label>
                    <input type="text" {...register("adminPhone", {required:true})}/>
                    {errors.adminPhone && <p style={{color:'red'}}>{errors.adminPhone.message}</p>}


                    <label>Admin Password:</label>
                    <input type="password" {...register("adminPassword", {required:true})}/>
                    {errors.adminPassword && <p style={{color:'red'}}>{errors.adminPassword.message}</p>}

                    <button type="submit">{isLoading ? "Registering": "Regsiter"}</button>
                    {message && <p>{message}</p>}
                </form>
                 <div id="recaptcha-container"></div>
            </div>

              ) : (
                <div>
                    <form onSubmit={verifyOTP}>
                        <label>OTP:</label>
                        <input 
                        type="text" 
                        value={otp} 
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                        />
                        <strong>{message}</strong>
                        <button type="submit">Verify</button>
                    </form>
                </div>
              )}
        </div>
    )
};

export default Register;