import {Request, Response, NextFunction} from 'express'
import BruteForceLogController from '../controllers/bruteForce.controller.ts';


const ATTEMPT_LIMIT = 4;
const WINDOW_MS = 15*60*1000;

const attemptCache = new Map<string, {count:number, firstAttempt:number}>();


const bruteForceProtector = async (req:Request, res:Response, next:NextFunction) => {

    const ip = req.ip;
    const userId = req.body.creds.userId || "unkown";
    const key = `${req}-${userId}`;
    const now = Date.now();


    const BFLC = new BruteForceLogController();


    let attemptData = attemptCache.get(key);

    if(attemptData) {
        if (now - attemptData.firstAttempt < WINDOW_MS) {
            attemptData.count++;

            if (attemptData.count > ATTEMPT_LIMIT) {
                const exists = await BFLC.getUserByIP(ip, userId);
                if(!exists) {
                    await BFLC.logBruteForce(ip, userId, now);
                }

                return res.status(429).json({message:"Too many login attempts. Try again later"});
            }
        } else {
            attemptData = {count:1, firstAttempt:now};
        }

        attemptCache.set(key, attemptData);
    } else {
        attemptCache.set(key, {count:1, firstAttempt:now});
    }

    next();
}

export default bruteForceProtector;