import express from 'express';
import AccountController from '../controllers/account.controller.ts';
import { verifyToken } from '../middleware/tokenWork.ts';
const AccountEndpoint = express.Router();


AccountEndpoint.get('/fetchAccountData', async (req , res) => {
    try {
        const userId = req.query.userId as string;
        const AC = new AccountController();
        const accountDetails = await AC.fetchAccountData(userId);
        res.status(200).json(accountDetails);
    } catch (error) {
        console.error("Error While Fetching Account Details, ", error);
        res.status(500).json({message:"Internal Server Error"});
    }
});

AccountEndpoint.patch('/changePasswords', verifyToken, async (req , res) => {
    try {
        const newCreds = req.body.creds;
        const AC = new AccountController();
    }
})

export default AccountEndpoint;