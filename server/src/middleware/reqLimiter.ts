import rateLimiter from 'express-rate-limit';
import BruteForceLogController from '../controllers/bruteForce.controller.ts';

const customLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max:4,
    handler: async (req, res, next) => {
        const ip = req.ip;
        const now = new Date().toISOString();

        const attemptedUser = req.body?.creds.userId || "unknown";

        const BFLC = new BruteForceLogController();

        const attempted_flaged = await BFLC.getUserByIP(ip, attemptedUser);
        if (!attempted_flaged) {
            
        }


        res.status(429).json({message: "Too many Attempts For Login. Please Try Again Later!"})
    }
});

export default customLimiter;



