"use client";
import axios from 'axios'
import './Hotspots.css'
import { useState } from 'react';

const Hotspots = () => {

    const [crimeType, setCrimeType] = useState("");

    const [hotspotsLocations, setHotspotsLocations] = useState<string[]>([])

    const getHotspots = async (crimeType:string) => {
        try {
            const hotspotsLocations = [];
            const response = await axios.get(`${process.env.NEXT_PUBLIC_ML_URL}/getHotspots?crimeType=${crimeType}`);
            const hotspots = response.data.hotspots;
            const locations : string [] = [];

            for(const center of hotspots) {
                const locationName = await fetchLocationName(center[0], center[1]);
                if (locationName) {
                    console.log(locationName);
                    locations.push(locationName)
                }
            }

            setHotspotsLocations(locations);
          
        } catch (error) {
            console.error("Error While Getting Hotspots, ", error);
        }
    }


    const fetchLocationName = async (lat:number, lng:number) => {

        try  {
            const response = await axios.get(`/api/reverse-geocode?lat=${lat}&lng=${lng}` , {
                headers:{
                    'User-Agent':'CrimexisApp/1.0 (admin@crimexis.com)'
                }
            });
            const location = response.data.location;
            return location;

        } catch (error) {
            console.error("Failed to reverse geocode: ", error);
        }
    }


    return (
        <div className="hotspots-page">
            <div className='hotspots-location'>
              <select
                onChange={(e) => setCrimeType(e.target.value)}
                className="dynamic-form-input"
            >
                <option value="">Select Crime Type</option>
                <option value="Theft">Theft</option>
                <option value="Robbery">Robbery</option>
                <option value="Burglary">Burglary</option>
                <option value="Assault">Assault</option>
                <option value="Murder">Murder</option>
                <option value="Kidnapping">Kidnapping</option>
                <option value="Harassment">Harassment</option>
                <option value="Domestic Violence">Domestic Violence</option>
                <option value="Drug Possession">Drug Possession</option>
                <option value="Weapon Possession">Weapon Possession</option>
                <option value="Traffic Violation">Traffic Violation</option>
                <option value="Vandalism">Vandalism</option>
                <option value="Fraud">Fraud</option>
                <option value="Cybercrime">Cybercrime</option>
                <option value="Rape">Rape</option>
                <option value="Terrorism">Terrorism</option>
            </select>
                <button onClick={() => getHotspots(crimeType)}>Find Hotspots</button>
                {hotspotsLocations.map((hotspot) => (
                    <div className='locations'>
                        <h3>{hotspot}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default Hotspots;