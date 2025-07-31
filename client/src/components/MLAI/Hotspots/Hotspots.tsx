"use client";
import axios from 'axios'
import './Hotspots.css'
import { useState } from 'react';
import { HotspotsDataTypes } from '@/components/Types/hotspot.data.types';

const Hotspots = () => {

    const [crimeType, setCrimeType] = useState("");

    const [hotspotsLocations, setHotspotsLocations] = useState<string[]>([]);
    const [hotspotMessage, setHotspotMessage] = useState("");

    const [hotspotData, setHotspotData] = useState<HotspotsDataTypes>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [hotspots, setHotspots] = useState<HotspotsDataTypes["hotspots"]>([]);

    const getHotspots = async (crimeType:string) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_ML_URL}/getHotspots?crimeType=${crimeType}`);
            const hotspots = response.data.hotspots;

            const finalHotspots : HotspotsDataTypes["hotspots"] = []

            const locations : string [] = [];
            for(const center of hotspots) {
                const locationName = await fetchLocationName(center[0], center[1]);
                if (locationName) {
                    const hotspot = {
                        locationName:locationName,
                        coordinates: {
                            lat:center[0],
                            lng:center[1]
                        }
                    }
                    finalHotspots.push(hotspot);
                    locations.push(locationName)
                }

            }

            setHotspots(finalHotspots);

            setHotspotsLocations(locations);
            setHotspotData((prev) => ({
                ...prev,
                crimeType:crimeType,
                hotspots:finalHotspots
            }))

          
        } catch (error) {
            console.error("Error While Getting Hotspots, ", error);
        }
    }

    const updateHotspotsRecords = async () => {

        try {
            const response  = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/hotspots/updateHotspots`, {hotspotData});
            const data = response.data;

            if (!data.success) {
                setHotspotMessage("Hotspots Auto Update Failed!")
            } else {
                setHotspotMessage("Hotspots Update Success!")

            }
        } catch (error) {
            console.error("Error While Updating Hotspots, ", error);
            setHotspotMessage("Hotspots Auto Update Failed!")

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
            <div className='hotspot-message-div'>
                <strong>{hotspotMessage}</strong>
            </div>
            <div className='hotspots-menu'>
              <select
                onChange={(e) => setCrimeType(e.target.value)}
                className="crime-type-input"
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
                <br/>
                <button onClick={() => updateHotspotsRecords()}>Update Hotspots</button>
                </div>
                <div className='hotspots-location'>
                {hotspotsLocations && hotspotsLocations.map((hotspot, index) => (
                    <div className='locations' key={index}>
                        <h3>{hotspot}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default Hotspots;