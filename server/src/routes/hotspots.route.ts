import express from 'express';
import HotspotsController from '../controllers/hotspots.controller.ts';
const HotspotsEndpoint = express.Router();

HotspotsEndpoint.post('/updateHotspots', async (req , res) => {
    try {
        const hotspotData = req.body.hotspotData;
        const HC = new HotspotsController();
        const result = await HC.updateHotspots(hotspotData);
        if (!result.success) {
            res.status(400).json(result);
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        console.error("Error While Updating Hotspots, ", error);
        res.status(500).json({success:true, message:"Internal Server Error"})

    }
});


HotspotsEndpoint.get('/fetchHotspots', async (req , res) => {
    try {
        const HC = new HotspotsController();
        const result = await HC.fetchHotspots();
        if (!result.success) {
            res.status(400).json(result);
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        console.error("Error While Updating Hotspots, ", error);
        res.status(500).json({success:true, message:"Internal Server Error"})
    }
});




export default HotspotsEndpoint;


