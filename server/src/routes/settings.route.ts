import express from 'express';
import SettingsController from '../controllers/settings.controller.ts';
const SettingsEndpoint = express.Router();

SettingsEndpoint.get('/fetchSettings', async (req , res) => {
    try {
        const SC = new SettingsController();
        const result = await SC.fetchSettings();
        if (!result.success) {
            res.status(400).json(result);
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        console.error("Error While Fetching The Settings, ", error);
        res.status(500).json({success:false, message: "Internal Server Error"});
    }
});


export default SettingsEndpoint;



