import Admins from "../models/admins.model.ts";
import User from "../models/user.model.ts";



class AccountController {
    constructor() {

    }


    async fetchAccountData (userId:string) {
        try {
            let accountDetails = null;
            if (userId.includes("ADM")) {
                accountDetails = await Admins.findOne({adminUserId:userId});
            } else {
                accountDetails = await User.findOne({userId:userId});
            }
            return {accountDetails};
        } catch (error) {
            console.error("Error While Fetching Account Data, ", error);
        }
    }
};

export default AccountController;