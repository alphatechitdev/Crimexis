import fs from 'fs';
import BruteForceLog from '../models/bruteforcelog.model.ts';


class BruteForceLogController {
    constructor () {

    }

    async logBruteForce (ip : string, attemptedUser : string, timeStamp : string) {

        try {
            await BruteForceLog.create({ip:ip, attemptedUser: attemptedUser, timestamp:timeStamp});

        } catch (error) {
            fs.appendFile('brute_force.log',
                 `${attemptedUser} with ${ip} attemped Brute Force on ${timeStamp}`
                 , (err) => {
                if (err) console.error("Failed to write to Fallback log file: ", err);
            });
            console.error("Error While Inserting Brute Force Data in Database, ", error);
        }
    }

    async getUserByIP(ip:string, attemptedUser:string) {
        try {
            const record = await BruteForceLog.find({ip:ip, attemptedUser:attemptedUser});
            if (record.length>0) {
                return true;
            } 
            return false;
        } catch (error) {
            console.error("Error While Searchinh Logs for Exact Record, ", error);
            return false;
        }
    }
};


export default BruteForceLogController;