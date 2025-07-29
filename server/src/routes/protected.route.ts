import express from 'express';
import { CustomRequest, verifyToken } from '../middleware/tokenWork.ts';
const ProtectedEndpoint = express.Router();


ProtectedEndpoint.get('/protected-route', verifyToken, async (req : CustomRequest  , res) => {
    res.status(200).json({success:true, userId:req.userId})
});

export default ProtectedEndpoint;