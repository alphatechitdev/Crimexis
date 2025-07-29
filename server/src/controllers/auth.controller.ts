import { RegisterCreds } from '../Types/register.creds.types.ts';
import { LoginCredsTypes } from '../Types/login.creds.types.ts';
import hashPassword, { verifyPassword } from '../utilities/hashing.ts';
import User from '../models/user.model.ts';
import { sendOTP } from '../utilities/sendOTP.ts';
import Admins from '../models/admins.model.ts';

class AuthController {
    constructor() {

    }

    async LoginAsUser(LoginCreds:LoginCredsTypes) {
        try {
            const foundUser = await User.findOne({userId:LoginCreds.userId});
            if(!foundUser) return {success:false, account:false};
            if(! await verifyPassword(foundUser.password as string ,LoginCreds.password)) {
                return {success:false, account:true}
            } else {
                return {success:true, account:true}
            }
        } catch (error) {
            console.error("Error While Logging In, ", error);
            return {success:false}
        }
    }

    async RegisterAsAdmin(RegisterData:RegisterCreds) {
        try {
            const hashedPassword = await hashPassword(RegisterData.adminPassword);

            RegisterData.adminPassword = hashedPassword;
            
            const admin = await Admins.insertOne(RegisterData);
            return {success:true};

        } catch (error) {
            console.error("Error While Registering, ", error);
            return {success:false};
        }
    }

    /* 
    async makeUsername (email:string) {
        try {
            const
            const name = email.split('@');
            const username = `${name}${}`
        } catch (error) {

        }
    } */
};


export default AuthController;