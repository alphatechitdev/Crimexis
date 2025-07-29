import express from 'express';
import { verifyOTP } from '../utilities/verifyOTP.ts';
const OTPEndpoint = express.Router();


OTPEndpoint.post('/verifyOTP', async (req , res) => {
    try {
        const {credsPhone, otp} = req.body;
        const verificationStatus = await verifyOTP(credsPhone, otp);

        if (verificationStatus.success) {
            res.status(200).json({success:true})
        } else {
            res.status(400).json({success:false})
        }
    } catch (error) {
        console.error("Error While Verifying OTP, ", error);
    }
});



export default OTPEndpoint;