"use client";
import { useForm } from "react-hook-form";
import { RegisterCreds } from "../Types/register.creds.types";
import axios from "axios";
import { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";
import './Register.css';
import { auth } from "../Lib/Firebase";
import { useRouter } from "next/navigation";
declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
    confirmationResult?: ConfirmationResult;
  }
}

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterCreds>();
  const [otpPhase, setOTPPhase] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const router = useRouter();

  const sendOTP = async (phoneNumber: string) => {
    try {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
      }
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: 'invisible',
        callback: (response: unknown) => {
          console.log("reCAPTCHA verified", response);
        }
      });

      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
      window.confirmationResult = confirmation;
    } catch (error) {
      console.error("Error While Sending OTP: ", error);
      setMessage("Failed to send OTP. Please check phone number or try again.");
    }
  };

  const verifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await window.confirmationResult?.confirm(otp);
      const user = result?.user;
      const idToken = await user?.getIdToken();

      setMessage("OTP Verified Successfully ✅");
      console.log("User Token: ", idToken);
      router.push('/Account');
    } catch (error) {
      console.error("OTP Verification Error: ", error);
      setMessage("Invalid OTP!");
    }
  };

  const onRegister = async (creds: RegisterCreds) => {
    try {
      setIsLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      if (!apiUrl) {
        console.error("Backend URL not set.");
        return;
      }

      const response = await axios.post(`${apiUrl}/api/auth/registerAdmin`, { creds });

      if (response.data.success) {
        await sendOTP(creds.adminPhone);
        setTimeout(() => setOTPPhase(true), 2000);
        setMessage("Registration successful. OTP sent.");
      } else {
        setMessage("Registration failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Registration Error: ", error);
      setMessage("Error during registration. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      {!otpPhase ? (
        <div className="form-container">
          <form onSubmit={handleSubmit(onRegister)}>
            <label>Department Name:</label>
            <input type="text" {...register("departmentName", { required: "Department name is required" })} />
            {errors.departmentName && <p style={{ color: 'red' }}>{errors.departmentName.message}</p>}

            <label>Department Main Office Address:</label>
            <input type="text" {...register("departmentMainOffice.address", { required: "Address required" })} />
            {errors.departmentMainOffice?.address && <p style={{ color: "red" }}>{errors.departmentMainOffice.address.message}</p>}

            <label>Admin Office Address:</label>
            <input type="text" {...register("adminOffice.address", { required: "Admin office address required" })} />
            {errors.adminOffice?.address && <p style={{ color: "red" }}>{errors.adminOffice.address.message}</p>}

            <label>Admin Name:</label>
            <input type="text" {...register("adminName", { required: "Admin name required" })} />
            {errors.adminName && <p style={{ color: 'red' }}>{errors.adminName.message}</p>}

            <label>Admin Email:</label>
            <input type="email" {...register("adminEmail", { required: "Email required" })} />
            {errors.adminEmail && <p style={{ color: 'red' }}>{errors.adminEmail.message}</p>}

            <label>Admin Phone (with country code):</label>
            <input type="text" {...register("adminPhone", { required: "Phone required" })} />
            {errors.adminPhone && <p style={{ color: 'red' }}>{errors.adminPhone.message}</p>}

            <label>Admin Password:</label>
            <input type="password" {...register("password", { required: "Password required" })} />
            {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
            <div style={{display:"flex", flexDirection:"row" , marginTop:"10px", gap:"10px"}}>
            <input type="checkbox" {...register("adminHonestCheck", {required:true})} className="checkbox"/>
            <label>I Accept That Above Information Is True</label>
            {errors.adminHonestCheck && <p style={{ color: 'red' }}>{errors.adminHonestCheck.message}</p>}
            </div>


            <button type="submit" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </button>
            {message && <p>{message}</p>}
          </form>
          <div id="recaptcha-container"></div>
        </div>
      ) : (
        <div>
          <form onSubmit={verifyOTP}>
            <label>Enter OTP:</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
            />
            <button type="submit">Verify</button>
            {message && <p>{message}</p>}
          </form>
        </div>
      )}
    </div>
  );
};

export default Register;
