"use client";
import { useEffect, useState } from "react"
import { HotspotsDataTypes } from "../Types/hotspot.data.types";
import axios from "axios";
import './CurrentLogs.css';



const CurrentLogs = () => {

    const [hotspots, setHotspots]  = useState<HotspotsDataTypes[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");


    const fetchHotspots = async () => {
        try {
            setIsLoading(true);
            setMessage("Getting Latest Data...")
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/hotspots/fetchHotspots`);
            const responseData = response.data;
            setHotspots(responseData.hotspots);
            setMessage("")

        } catch (error) {
            console.error("Error While Fetching Hotspots, ", error);
            setMessage("Failed To Get Hotspots. Try Again.");
            setIsLoading(false);
        } finally {
            setIsLoading(false);

        }

    }

    useEffect(() => {
        fetchHotspots();
    }, []);



    return (
        <div className="current-logs">
            <h1>Latest Hotspots</h1>
            <strong>{message}</strong>
            <div className="hotspots">
                {isLoading && (
                    <div className="spinner"></div>
                )}
                {hotspots && (
                    hotspots.map((hotspot, index) => (
                        <div key={index} className="hotspot-box">
                            <h2>{hotspot.crimeType}</h2>
                            {hotspot.hotspots.map((hotspotLocation, index) => (
                                <div key={index} className="hotspot-points">
                                    <h3>{hotspotLocation.locationName}</h3>
                                    <h4>Coordinates</h4>
                                    <strong>{hotspotLocation.coordinates.lat}</strong>
                                    <br/>
                                    <strong>{hotspotLocation.coordinates.lng}</strong>
                                </div>
                            ))}
                        </div>
                    ))
                )}
            </div>
        </div>
    )
};

export default CurrentLogs;