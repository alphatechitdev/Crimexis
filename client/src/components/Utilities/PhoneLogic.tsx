import { useState } from "react";
import { RecaptchaVerifier , signInWithPhoneNumber } from "firebase/auth/web-extension";


const PhoneLogic = () => {

    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");


    const sendOTP = async () => {
        try {
            window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
                size:'invisible',
                callback: (response) => {
                    console.log("Verified")
                }
            })
        } catch (error) {
            console.error("Error While Sending OTP, ", error);
        }
    }

    return (
        <div>

        </div>
    )
};


export default PhoneLogic;


