

export interface CrimeDataTypes {
    crimeId:string;
    crimeType:string;
    victim:{
        name:string;
        age:number;
        profession:string;
    }[];
    crimeLocation:string;
    coordinates:{
        lat:number,
        lng:number
    }
    crimeTime:Date;
    involvedPeople:{
        name:string,
        age:number,
        profession:string
    }[],
    reportedBy:string;
    severityLevel: string
}



