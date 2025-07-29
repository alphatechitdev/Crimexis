import twilio from 'twilio';

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export const verifyOTP = async (destination: string, code: string) => {
    try {
        const verificationCheck = await client.verify.v2
        .services(process.env.TWILIO_VERIFY_SID)
        .verificationChecks
        .create({to:destination, code});

        return {
            success: verificationCheck.status === 'approved'
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return { success: false };
    }
}