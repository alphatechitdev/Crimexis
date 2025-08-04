import express from 'express';
import AuthController from '../controllers/auth.controller.ts';
import { generateToken } from '../middleware/tokenWork.ts';
import customLimiter from '../middleware/reqLimiter.ts';
const AuthEndpoint = express.Router();


AuthEndpoint.get('/logout', async (req, res) => {
  try {
    res.clearCookie('CrimexisSessionToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/'
    });
    res.status(200).json({ success:true, message: 'Logged out' });
  } catch (error) {
    console.error("Error While Logging Out: ", error);
    res.status(500).json({ message: 'Logout Failed!' });
  }
});



AuthEndpoint.post('/login', customLimiter, async (req, res) => {
    try {
        const {creds} = req.body;
        const AC = new AuthController();
        const result = await AC.Login(creds);
        if(!result.success) {
            res.status(401).json(result);
        } else {
            const token = generateToken({userId:creds.userId});
            res.cookie('CrimexisSessionToken', token, {
                sameSite:'none',
                httpOnly:true,
                secure:true,
                maxAge:3600000
            });
            
            res.status(200).json(result);
        }
    } catch (error) {
        console.error("Error While Loggin In (Endpoint/Function), ", error);
        res.status(500).json({success:false});
    }
});


AuthEndpoint.post('/registerAdmin', async (req, res) => {
    try {
        const {creds} = req.body;
        const AC = new AuthController();
        const result = await AC.RegisterAsAdmin(creds);
        if(result.success) {
            const token = generateToken({userId:result.adminUserID});
            res.cookie('CrimexisSessionToken', token, {
                sameSite:'none',
                httpOnly:true,
                secure:true,
                maxAge: 3600000
            })
            res.status(200).json({success:true});
        } else {
            res.status(400).json({success:false});
        }
    } catch (error) {
        console.error("Error While Registering The User, ", error);
    }
});

AuthEndpoint.post('/registerUser', async (req , res) => {
    try {
        const {userCreds} = req.body;
        const AC = new AuthController();
        const result = await AC.RegisterUser(userCreds); 
        if (!result.success) {
            res.status(400).json({success:false})
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        console.error("Error While Registering The User, ", error);
        res.status(500).json({success:false, message:"Internal Server Error!"})
    }
});

export default AuthEndpoint;