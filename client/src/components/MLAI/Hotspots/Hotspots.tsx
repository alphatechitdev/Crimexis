"use client";
import axios from 'axios'
import './Hotspots.css'
import { useState } from 'react';

const Hotspots = () => {
    const [hotspotsLocations, setHotspotsLocations] = useState<string[]>([])

    const getHotspots = async () => {
        try {
            const hotspotsLocations = [];
            const response = await axios.get(`${process.env.NEXT_PUBLIC_ML_URL}/getHotspots`);
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
                <button onClick={getHotspots}>Find Hotspots</button>
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