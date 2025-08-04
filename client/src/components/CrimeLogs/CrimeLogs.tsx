"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { CrimeDataTypes } from "../Types/crimes.data.types";
import './CrimeLogs.css'

const CrimeLogs = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    const [crimeData, setCrimeData] = useState<CrimeDataTypes[]>()
    const [crimeType, setCrimeType] = useState<null | string>(null);

    const fetchCrimeData = async (crimeType:string | null) => {

        try {
            setIsLoading(true);
            setMessage("Getting Data...")
            const response = await axios.get(`
                ${process.env.NEXT_PUBLIC_BACKEND_URL}/api/crimework/fetchCrimeData`
                + (crimeType ? `?crimeType=${crimeType}` : "")
                );
            const crime_data = response.data.crimeData;
            setCrimeData(crime_data);
        } catch (error) {
            console.error("Error While Fetching The Crime Data, ", error);
            setIsLoading(false);
            setMessage("Failed to Get Data...")
        } finally {
            setIsLoading(false);
            setMessage("")
        }
    }

    useEffect (() => {
        fetchCrimeData(null);
    }, []);

    useEffect(() => {
        if (crimeType) {
            fetchCrimeData(crimeType)
        }
    }, [crimeType])


    return (
        <div className="crime-logs-page">
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
            <div style={{justifyContent:"center", marginTop:"30px"}}>
            {isLoading && (
                <div className="spinner"></div>
            )}
            {message}
            </div>
            <div className="crime-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Crime ID</th>
                            <th>Crime Type</th>
                            <th>Victim</th>
                            <th>Crime Location</th>
                            <th>Coordinates</th>
                        </tr>
                    </thead>
                    <tbody>
                        {crimeData?.map((crime, index) => (
                            <tr key={index}>
                                <td>{crime.crimeId}</td>
                                <td>{crime.crimeType}</td>
                                <td>{crime.victim.map((v, i) => (
                                    <div key={i}>
                                        {v.name}({v.age}, {v.profession})
                                    </div>
                                ))}</td>
                                <td>{crime.crimeLocation}</td>
                                <td>{(crime.coordinates.lat)} {(crime.coordinates.lng)}</td>
                                <td></td>
                            </tr>
                        ))}

                    </tbody>

                </table>
            </div>
        </div>
    )
};

export default CrimeLogs;