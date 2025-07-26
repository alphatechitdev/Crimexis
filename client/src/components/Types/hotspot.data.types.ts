




export interface HotspotsDataTypes {
    crimeType: string;
    hotspots: {
        locationName:string;
        coordinates: {lat:number, lng:number}
    }[],
}