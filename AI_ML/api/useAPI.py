
from fastapi import FastAPI, Query
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
import os

from models.kMeans import ApplyKMeans
from trainer.RForestTrainer import TrainRandomForest
from dataController.crimeController import fetchCrimeData, clean_crime_data
from controllers.RFcontroller import ApplyRF
import joblib

current_dir = os.path.dirname(os.path.abspath(__file__))
RFmodel_path = os.path.join(current_dir, '..', 'models', 'RForest.pkl')

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ['http://localhost:3000', 'https://crimexis.vercel.app', 'https://crimexis.alphatechit.dev'],
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
    
    
@app.post('/getSeverity')
def getSeverity(data):
    model = joblib.load(RFmodel_path)
    severity = ApplyRF(data=data, model=model)
    return severity
