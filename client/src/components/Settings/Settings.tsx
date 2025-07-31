"use client";
import axios from 'axios';
import './Settings.css';
import { useEffect, useState } from 'react';
import { SettingsDataTypes } from '../Types/settings.data.types';


const Settings = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setSettingsData] = useState<SettingsDataTypes>()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [defaultSettings, setDefaultSettings] = useState<SettingsDataTypes>({
        siteTitle:"Crimexis",
        maintenaceNode:true,
        allowUserRegistration:true,
    });



    const fetchSettings = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/settings/fetchSettings`);
            const responseData = response.data;
            if (responseData.settings.length === 0) {
                setSettingsData(defaultSettings);
            } else {
                setSettingsData(responseData.settings);
            }
            
        } catch (error) {
            console.error("Error While Fetching The Settings, ", error);
        }
    };

    useEffect(() => {
        fetchSettings();
    });



    return (
        <div className="settings-page">
           <h2>Under Development</h2>

        </div>
    )
};

export default Settings;