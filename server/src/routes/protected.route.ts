import express from 'express';
import { verifyToken } from '../middleware/tokenWork.ts';
const ProtectedEndpoint = express.Router();


ProtectedEndpoint.get('/protected-route', verifyToken, async (req , res) => {
    res.status(200).json({success:true})
});

export default ProtectedEndpoint;