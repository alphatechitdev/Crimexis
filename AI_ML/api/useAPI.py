
from fastapi import FastAPI, Query
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware

from models.kMeans import ApplyKMeans
from trainer.RForestTrainer import TrainRandomForest
from dataController.crimeController import fetchCrimeData, clean_crime_data
import joblib

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ['http://localhost:3000'],
    allow_credentials = True,
    allow_methods = ['*'],
    allow_headers = ['*']
)

@app.get('/getHotspots')
def getHotspots(crimeType: Optional[str] = Query(default=None)):
    crimeData = fetchCrimeData(crimeType)
    cleanData = clean_crime_data(crimeData)
    coords = [[item["lat"], item["lng"]] for item in cleanData]
    hotspots = ApplyKMeans(coords)
    return {"hotspots": hotspots}
    
    
    
@app.get('/TrainRForest')
def trainRForest(): 
    crimeData = fetchCrimeData()
    TrainRandomForest(crimeData)
    
    
@app.get('/getSeverity')
def getSeverity():
    model = joblib.load()