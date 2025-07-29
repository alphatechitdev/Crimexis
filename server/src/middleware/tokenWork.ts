
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';

export const generateToken = (payload:Object) => {
    return jwt.sign(payload, process.env.JWT_SECRET!, {expiresIn:'24h'})
}

export interface CustomRequest extends Request {
    userId?:any
}


export const verifyToken = (req : CustomRequest , res : Response , next: NextFunction) => {
    const token = req.cookies.CrimexisSessionToken;

    if (!token) {
        res.status(401).json({success:false, message: "Unauthorized!"})
    }

    jwt.verify(token, process.env.JWT_SECRET!, (err : VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
        if (err) {
            res.status(403).json({success:false, message: "Forbidden!"})
        }
        req.userId = decoded

    })
    next();
}