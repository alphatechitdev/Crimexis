import dotenv from 'dotenv';
dotenv.config();

import twilio from 'twilio';


const client = twilio(process.env.TWILIO_SID as string, process.env.TWILIO_AUTH_TOKEN as string);

export const sendOTP = async (destination:string, channel: 'sms' | 'email') => {
    try {
        console.log(destination);
        const verification = await client.verify.v2.services(process.env.TWILIO_VERIFY_SID as string)
        .verifications
        .create({
            to:destination,
            channel:channel
        });

        return {success:true, sid:verification?.sid}
    } catch (error) {
        console.error("Error While Sending OTP", error);
        return {success:false};
    }
}