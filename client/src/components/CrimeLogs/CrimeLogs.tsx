"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { CrimeDataTypes } from "../Types/crimes.data.types";


const CrimeLogs = () => {

    const [crimeData, setCrimeData] = useState<CrimeDataTypes[]>()

    const fetchCrimeData = async () => {

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/crimework/fetchCrimeData`);
            const crime_data = response.data.crimeData;
            setCrimeData(crime_data);
        } catch (error) {
            console.error("Error While Fetching The Crime Data, ", error);
        }
    }

    useEffect (() => {
        fetchCrimeData();
    }, []);


    return (
        <div className="crime-logs-page">
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
                                <td>{crime.coordinates.map}</td>
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