import { RegisterCreds } from '../Types/register.creds.types.ts';
import { LoginCredsTypes } from '../Types/login.creds.types.ts';
import hashPassword, { verifyPassword } from '../utilities/hashing.ts';
import User from '../models/user.model.ts';
import Admins from '../models/admins.model.ts';
import CrimexisProtcModel from '../models/crimexisProtocols.model.ts';
import { UserCredsDataTypes } from '../Types/userRegister.creds.types.ts';


class AuthRulesController {
    constructor () {

    }

    async getCurrentUserSeries () {
        try {
            const result = await CrimexisProtcModel.findOne({});
            const userSeriesName = result?.currentUserSeries;

            if (!result || !userSeriesName) return null;

            const currentSeries = result.userSeries?.get(userSeriesName);
            
            return {
                userSeriesName,
                userSeriesNumber: currentSeries?.totalUsers ?? 0
                };
        } catch (error) {
            console.error("Error To Fetch The Admin Series, ", error);
            return null;
        }
    }

    async updateSeries(series:string, totalType:string) {
        try {
            const updatedOne = await CrimexisProtcModel.updateOne({}, {
                $set : {
                    [series]: {
                        [totalType] : +1
                    }
                }
            })
        } catch (error) {
            console.error("Error While Updating The Users, ", error);
        }
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
                foundUser = await Admins.findOne({ adminUserId: LoginCreds.userId });
            } else {
                foundUser = await User.findOne({userId:LoginCreds.userId});
            }
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
            const hashedPassword = await hashPassword(RegisterData.password);

            RegisterData.password = hashedPassword;
            RegisterData.adminUserId = await this.genarateUsername("admin");
            
            const admin = await Admins.insertOne(RegisterData);
            await CrimexisProtcModel.updateOne({}, {
                $inc:{[`adminSeries.${RegisterData.adminUserId.slice(0,7)}.totalAdmins`]:1}
            })
            return {success:true, adminUserID:admin.adminUserId};

        } catch (error) {
            console.error("Error While Registering, ", error);
            return {success:false};
        }
    }

    async RegisterUser(creds:UserCredsDataTypes) {
        try {
            const hashedPassword = await hashPassword(creds.password);
            creds.password = hashedPassword;
            creds.userId = await this.genarateUsername("user");
            const user = await User.insertOne(creds);
            await CrimexisProtcModel.updateOne({}, {
                $inc:{[`userSeries.${creds.userId.slice(0,7)}.totalUsers`]:1}
            })
            return {success:true, userId:creds.userId};

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


    
    async genarateUsername (role:string) {
        try {
            let username = '';
            if (role === "admin") {
                const admin  = await this.getCurrentAdminSeries();
                username = `${admin?.adminSeriesName}-${Number(admin?.adminSeriesNumber)+1}`
            } else {
                const user = await this.getCurrentUserSeries();
                username = `${user?.userSeriesName}-${Number(user?.userSeriesNumber)+1}`

            }
            return username;
        } catch (error) {
            console.log("Error While Generating Username, ", error);
            return "FallbackSeries-1";
        }
    } 
};


export default AuthController;