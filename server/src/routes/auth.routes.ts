import express from 'express';
import AuthController from '../controllers/auth.controller.ts';
import { generateToken } from '../middleware/tokenWork.ts';
const AuthEndpoint = express.Router();



AuthEndpoint.post('/login', async (req, res) => {
    try {
        const {creds} = req.body;
        const AC = new AuthController();
        const result = await AC.Login(creds);
        if(!result.success) {
            res.status(401).json(result);
        } else {
            const token = generateToken({userId:creds.userId});
            res.cookie('CrimexisSessionToken', token, {
                sameSite:true,
                secure:false,
                maxAge:360000
            })
            res.status(200).json(result);
        }
    } catch (error) {
        console.error("Error While Loggin In (Endpoint/Function), ", error);
        res.status(500).json({success:false});
    }
});


AuthEndpoint.post('/register', async (req, res) => {
    try {
        const {creds} = req.body;
        const AC = new AuthController();
        const result = await AC.Register(creds);
        if(result.success) {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error) {
        console.error("Error While Registering The User, ", error);
    }
})

export default AuthEndpoint;