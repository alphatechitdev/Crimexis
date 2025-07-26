import express from 'express';
import CrimeController from '../controllers/crime.controller.ts';
const CrimeEndpoint = express.Router();



CrimeEndpoint.post('/addCrime', async (req, res) => {
    try {
        const {data} = req.body;
        const CC = new CrimeController();
        const result = await CC.addCrime(data);
        if (!result?.success) {
            res.status(400).json(result);
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        console.error("Error Adding the Crime (Endpoint), ", error);
        res.status(500).json({success:false})
    }
});

CrimeEndpoint.get('/exportCrimeData', async (req , res) => {
    try {

    } catch (error) {

    }
})

CrimeEndpoint.get('/fetchCrimeData', async (req , res) => {
    try {
        let crimeType : null | string = null
        
        if (typeof req.query.crimeType === "string") {
            crimeType  = req.query.crimeType;
        }
        const CC = new CrimeController();
        const result = await CC.fetchCrimeData(crimeType);
        if(!result.success) {
            res.status(404).json(result);
        } else {
            res.status(200).json(result);          
        }
    } catch (error) {
        console.error("Error While Fetching Crime Data, ", error);
        res.status(200).json({message:"Internal Server Error"});          

    }
});


export default CrimeEndpoint;

