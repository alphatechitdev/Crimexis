
from fastapi import FastAPI

from models.kMeans import ApplyKMeans
from dataController.crimeController import fetchCrimeData, clean_crime_data

app = FastAPI()

@app.post('/getHotspots')
def getHotspots():
    crimeData = fetchCrimeData()
    cleanData = clean_crime_data(crimeData)
    ApplyKMeans(cleanData)
    
    
    
    