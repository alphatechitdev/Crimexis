import express from 'express';
import AccountController from '../controllers/account.controller.ts';
const AccountEndpoint = express.Router();


AccountEndpoint.get('/getAccountDetails', async (req , res) => {
    try {
        const userId = req.query.userId as string;
        const AC = new AccountController();
        const accountDetails = await AC.fetchAccountData(userId);
        res.status(200).json({accountDetails});
    } catch (error) {
        console.error("Error While Fetching Account Details, ", error);
        res.status(500).json({message:"Internal Server Error"});
    }
});

export default AccountEndpoint;