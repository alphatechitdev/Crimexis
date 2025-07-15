import Crime from "../models/crime.model.ts";
import { CrimeDataTypes } from "../Types/crimes.data.types.ts";


class CrimeController {
    constructor () {

    }

    async addCrime(data:CrimeDataTypes) {
        try {
            const crime = await Crime.insertOne(data);
            return {success:true};
        } catch (error) {
            console.error("Error While Adding Crime, ", error);
        }
    }

    async fetchCrimeData() {
        try {
            const crimeData = await Crime.find({}, {
                crimeType:1,
                coordinates:1,
                crimeTime:1,
                severityLevel:1,
                _id:0
            });
            return {crimeData:crimeData};
        } catch (error) {
            console.error("Error While Fetching The Crime Data")
        }
    }
};

export default CrimeController;