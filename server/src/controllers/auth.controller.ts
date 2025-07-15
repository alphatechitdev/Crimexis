import argon2 from 'argon2';
import { RegisterCreds } from '../Types/register.creds.types.ts';
import { LoginCredsTypes } from '../Types/login.creds.types.ts';
import hashPassword, { verifyPassword } from '../utilities/hashing.ts';
import User from '../models/user.model.ts';


class AuthController {
    constructor() {

    }

    async Login(LoginCreds:LoginCredsTypes) {
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

    async Register(RegisterData:RegisterCreds) {
        try {
            const hashedPassword = await hashPassword(RegisterData.password);
            const newUser = {
                name:RegisterData.name,
                userId: RegisterData.name.toLowerCase().concat('012'),
                password:hashedPassword
            }
            const user = await User.insertOne(newUser);
            return {success:true, userId:user.userId};
        } catch (error) {
            console.error("Error While Registering, ", error);
            return {success:false};
        }
    }
};

export default AuthController;