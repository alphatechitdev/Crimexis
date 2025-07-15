"use client";
import { useState } from "react";
import DynamicForm from "../Utilities/DynamicForm";
import { CrimeDataTypes } from "../Types/crimes.data.types";
import axios from "axios";
import './AddCrime.css'

const AddCrime = () => {
    const [crimeData, setCrimeData] = useState<CrimeDataTypes>({
        crimeId:"",
        crimeType:"",
        victim:[
            {
                name:"",
                age:18,
                profession:""
            }
        ],
        crimeLocation:"",
        coordinates:{
            lat:0,
            lng:0,
        },
        crimeTime:"",
        involvedPeople:[
            {
                name:"",
                age:18,
                profession:""
            }
        ],
        reportedBy:"",
        severityLevel:"low"

    })

    const handleFormSubmit = async (data:CrimeDataTypes) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/crimework/addCrime`,{data});
            if (response.data.success) {
                alert("Crime Data Added Successfuly")
            } else {
                alert("Crime Data Not Addess")

            }
        } catch (error) {
            console.error("Error While Adding Crime Data, ", error);
        }
    }



    return (
        <div className="addCrime-page">
            <DynamicForm<CrimeDataTypes>
            onSubmit={handleFormSubmit}
            initialData={crimeData}

            />
        </div>
    )
};


export default AddCrime;