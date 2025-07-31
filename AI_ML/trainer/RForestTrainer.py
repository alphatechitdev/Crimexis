import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib

def TrainRandomForest(data):
    df = pd.DataFrame(data)
    
    df = df[[
        "crimeType",
        "victim.0.age",
        "victime.0.profession",
        "coordinated.lat",
        "coordinates.lng",
        "reportedBy",
        "severityLevel"
    ]]
    
    df.dropna()
    
    le_crimeType = LabelEncoder()
    le_profession = LabelEncoder()
    le_reportedBy = LabelEncoder()
    le_severity = LabelEncoder()
    
    
    
    df["crimeType"] = le_crimeType.fit_transform(df["crimeType"])
    df["victim.0.profession"] = le_profession.fit_transform(df["victim.0.profession"])
    df["reportedBy"] = le_reportedBy.fit_transform(df["reportedBy"])
    df["severityLevel"] = le_severity.fit_transform(df["severityLevel"])
    
    X = df.drop("severityLevel", axis=1)
    y = df["severityLevel"]
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
    
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    
    model.fit(X_train, y_train)
    
    joblib.dump(model, '/models/RForest.pkl')
    
    # Accuracy
    print("Train Accuracy: ", model.score(X_train, y_train))
    print("Test Accuracy: ", model.score(X_test, y_test))
    
    

    
    