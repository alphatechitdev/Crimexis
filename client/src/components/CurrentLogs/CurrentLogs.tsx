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

        } catch (error) {

        } finally {
            
        }

    }

    useEffect(() => {
        fetchHotspots();
    }, []);



    return (
        <div className="current-logs">
            <h1>Latest Hotspots</h1>
            <div className="hotspots">
                
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