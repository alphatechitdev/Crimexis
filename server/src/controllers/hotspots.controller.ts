import Hotspots from "../models/hotspots.model.ts";
import { HotspotsDataTypes } from "../Types/hotspots.types.ts";


class HotspotsController {
    constructor() {

    }

    async updateHotspots(hotspotData:HotspotsDataTypes) {
        try {
            const {crimeType, hotspots} = hotspotData
            const existingDoc = await Hotspots.findOne({crimeType});
            if (!existingDoc) {
                await Hotspots.create({crimeType, hotspots})
                return {addedTrue:true, success:true}
            }

            const existingNames = new Set(existingDoc.hotspots.map(h => h.locationName));
            
            const newHotspots = hotspots.filter(h => !existingNames.has(h.locationName));

            if (newHotspots.length > 0) {
                await Hotspots.updateOne(
                    {crimeType}, 
                    {$push: {hotspots: {$each: newHotspots}}}
                )
            }

            return {success:true};
           
        } catch (error) {
            console.error("Error While Updating Hotspots, ", error);
            return {success:false}
        }
    }

    async fetchHotspots () {
        try {
            const hotspots = await Hotspots.find({});
            return {success:true, hotspots:hotspots};
        } catch (error) {
            console.error("Error While Fetching Hotspots, ", error);
            return {success:false, hotspots:null}
        }
    }
}

export default HotspotsController;