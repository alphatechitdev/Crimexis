
from configs.dbconfig import db


def fetchCrimeData(crimeType):
    crime_collection = db["crimes"]
    crime_data = list(crime_collection.find({"crimeType":crimeType}))
    return crime_data
    

def clean_crime_data(raw_data):
    cleaned = []
    
    for item in raw_data:
        try:
            cleaned.append({
                "type":item.get("crimeType"),
                "lat":float(item["coordinates"]["lat"]),
                "lng":float(item["coordinates"]["lng"]),
                "time":item.get("crimeTime"),
                "severity":item.get("severityLevel")
            })
        except Exception as e:
            print(f"Skipping invalid item: {e}")
            continue
        
    return cleaned

