import {MapContainer, TileLayer, Marker, useMapEvents} from 'react-leaflet';
import {useEffect, useState} from 'react';
import axios from 'axios';

function LocationSelector ({onSelect}:{onSelect:(latlng:{lat:number, lng:number})=> void}) {
    useMapEvents({
        click(e) {
            onSelect({lat:e.latlng.lat, lng:e.latlng.lng})
        }
    });
    return null;
}

export default function CrimeMapForm({
    onSelectLocation
}:{onSelectLocation:(data:{cords:{lat:number, lng:number} | null, location:string}) => void}) {

    const [coords, setCoords] = useState<{lat:number, lng:number} | null>(null);

   


    const fetchLocationName = async (lat:number, lng:number) => {

        try  {
            const response = await axios.get(`/api/reverse-geocode?lat=${lat}&lng=${lng}` , {
                headers:{
                    'User-Agent':'CrimexisApp/1.0 (admin@crimexis.com)'
                }
            });
            const location = response.data.location;
            onSelectLocation({cords:{lat,lng}, location});

        } catch (error) {
            console.error("Failed to reverse geocode: ", error);
            onSelectLocation({cords:{lat, lng}, location:"Unknown Location"});
        }
    }




    return (
        <div>
            <MapContainer center={[32.1877, 74.1945]} zoom={12} style={{height:'300px', width:'100%'}}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <LocationSelector onSelect={(latlng) => {
                    setCoords(latlng);
                    fetchLocationName(latlng.lat, latlng.lng);
                }}
                />

                {coords && <Marker position={[coords.lat, coords.lng]}/>}

            </MapContainer>

            {coords && (
                <div>
                    <p>Selected Coordinates:</p>
                    <p>Latitude: {coords.lat}</p>
                    <p>Longitude: {coords.lng}</p>
                </div>
            )}
        </div>
    )
};

