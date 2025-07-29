import { RegisterCreds } from '../Types/register.creds.types.ts';
import { LoginCredsTypes } from '../Types/login.creds.types.ts';
import hashPassword, { verifyPassword } from '../utilities/hashing.ts';
import User from '../models/user.model.ts';
import Admins from '../models/admins.model.ts';
import CrimexisProtcModel from '../models/crimexisProtocols.model.ts';




class AuthRulesController {
    constructor () {

    }


    async getCurrentAdminSeries() {
        try {
            const result = await CrimexisProtcModel.findOne({});
            const adminSeriesName = result?.currentAdminSeries;

            if (!result || !adminSeriesName) return null;

            const currentSeries = result.adminSeries?.get(adminSeriesName);
            
            return {
                adminSeriesName,
                adminSeriesNumber: currentSeries?.totalAdmins ?? 0
                };
        } catch (error) {
            console.error("Error To Fetch The Admin Series, ", error);
            return null;
        }
    }
}

class AuthController extends AuthRulesController{
    constructor() {
        super()
    }

    async Login(LoginCreds:LoginCredsTypes) {
        try {
            let foundUser = null;
            if (LoginCreds.userId.includes("ADM")) {
                foundUser = await Admins.findOne({ userId: LoginCreds.userId });
            }
            foundUser = await User.findOne({userId:LoginCreds.userId});
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
            RegisterData.adminUserId = await this.genarateUsername();
            
            const admin = await Admins.insertOne(RegisterData);
            return {success:true, adminUserID:admin.adminUserId};

        } catch (error) {
            console.error("Error While Registering, ", error);
            return {success:false};
        }
    }

    async verifyAdminsAccounts() {
        try {
            const result = await Admins.findOneAndUpdate({})
        } catch (error) {
            console.error("Error While Verifying Admin Accounts, ", error)
        }
    }


    
    async genarateUsername () {
        try {
            const admin  = await this.getCurrentAdminSeries();
            const username = `${admin?.adminSeriesName}-${Number(admin?.adminSeriesNumber)+1}`
            return username;
        } catch (error) {
            console.log("Error While Generating Username, ", error);
            return "FallbackSeries-1";
        }
    } 
};


export default AuthController;