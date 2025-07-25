import React, { useEffect, useState } from "react";
import './DynamicForm.css';
import CrimeMapForm from "../MapLocation/CrimeMapForm";

interface DynamicFormProps<T>{
    initialData:T;
    onChange:(updatedData:T) => void;
    onSubmit:(finalData:T) => void;
}


export default function DynamicForm<T>({initialData, onChange, onSubmit}:DynamicFormProps<T>){

    const [formData, setFormData] = useState<T>(initialData);
    const [crimeCoordinates, setCrimeCoordinates] = useState<{lat:number, lng:number}|null>(null);
    const [crimeLocation, setCrimeLocation] = useState<string>("");


    const handleMapSelect = (data:{cords:{lat:number, lng:number} | null, location:string}) => {
        setCrimeCoordinates(data.cords);
        setCrimeLocation(data.location);

        setFormData(prev => {
            const updated = structuredClone(prev as any);

            if (data.cords) {
                updated.coordinates = data.cords
            }
            updated.crimeLocation = data.location;
            return updated;
        })
    }


    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);


    const handleChange = (path:string[], value:unknown) => {
        setFormData(prev => {
            const updated = structuredClone(prev);
            let current : Record<string, unknown> = updated as Record<string, unknown>;

            for (let i = 0; i<path.length-1; i++) {
                if (!current[path[i]]) current[path[i]] = {}
                current = current[path[i]] as Record<string, unknown>
            }
            const lastKey = path[path.length-1];

            if(Array.isArray(current) && !isNaN(Number(lastKey))) {
                current[Number(lastKey)] = value
            } else {
                current[lastKey] = value
            };
            return updated;
        })
    }

    const renderFields = (data:unknown, path:string[] = []) : React.JSX.Element[] | null => {
        if (typeof data !== "object" || data === null) return null;

        return Object.entries(data).map(([key, value]) => {
            const currentPath = [...path, key];
            const uniqueKey = currentPath.join("-");


            if (Array.isArray(value)) {
                return (
                    <div key={uniqueKey} className="dynamic-form-field">
                        <strong>{key}(Array)</strong>

                        {value.map((item, index) => {
                            const itemPath = [...currentPath, index.toString()];
                            const itemKey = itemPath.join("-");


                            if(typeof item === "object" && item !== null) {
                                return (
                                    <div key={uniqueKey}>
                                        {renderFields(item, itemPath)}
                                    </div>
                                )
                            }

                            if (typeof item === 'string' || typeof item === 'number') {
                                return (
                                    <div key={itemKey} className="dynamic-form-field">
                                        <label>{itemPath.join("-")}</label>
                                        <input
                                        type="text"
                                        value={item}
                                        onChange={(e) => handleChange(itemPath, e.target.value)}
                                        />
                                
                                    </div>
                                )
                            }
                        })}

                    </div>
                )
            }
            if (typeof value === "string" && key === "crimeType") {
                return (
                     <div key={uniqueKey} className="dynamic-form-field">
            <label>{currentPath.join("-")}</label>
            <select
                value={value}
                onChange={(e) => handleChange(currentPath, e.target.value)}
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
        </div>
                )
            }
            if (key === "crimeTime") {
                return (
                    <div key={uniqueKey} className="dynamic-form-fied">
                        <label>{currentPath.join("-")}</label>
                        <input 
                        type="datetime-local" 
                        onChange={(e) => handleChange(currentPath, new Date(e.target.value))}
                        className="dynamic-form-input"
                        />
                    </div>
                )
            }
             if (typeof value === "string" && key === "severityLevel") {
                return (
                    <div key={uniqueKey} className="dynamic-form-fied">
                        <label>{currentPath.join("-")}</label>
                            <select onChange={(e) => handleChange(currentPath, e.target.value)} className="dynamic-form-input">
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>

                    </div>
                )
             }
             if (typeof value === "string" || typeof value === "number") {
                return (
                    <div key={uniqueKey} className="dynamic-form-field">
                        <label>{currentPath.join("-")}</label>
                        <input
                        type="text"
                        value={value}
                        onChange={(e) => handleChange(currentPath, e.target.value)}
                        className="dynamic-form-input"
                        />
                    </div>
                )
             }
            
             if (typeof value === "object" && key === "coordinates") {
                return (
                    <div key={uniqueKey}>
                    <CrimeMapForm onSelectLocation={handleMapSelect}/>
                     </div>
                )
             }

             if (typeof value === "object" && value !== null && !Array.isArray(value)) {
                return (
                    <div className="dynamic-form-grid">
                        <strong>{key}</strong>
                        {renderFields(value, currentPath)}

                    </div>
                )
             }
        })

        // ✅ Filter out null and undefined
      .filter((el): el is React.JSX.Element => el !== null && el !== undefined)
    }

    const handleSubmit = () => {
        if (onSubmit) {
            onSubmit(formData)
        } else {
            console.log("Form Data, ", formData);
            alert("Check Console For Final Form Data");
        }
    }

    return (
        <div className="dynamic-form-component">
            <h2>Dynamic Form For Adding Crimes</h2>
            <div className="dynamic-form-grid">
                {renderFields(formData)}
            </div>
            <button className="dynamic-form-button" onClick={handleSubmit}>Submit</button>
        </div>
    )
};


