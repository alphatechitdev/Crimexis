import pandas as pd;
from sklearn.preprocessing import LabelEncoder


def ApplyRF(data, model):
    input_df = pd.DataFrame([data])
    le_crimeType = LabelEncoder()
    le_profession = LabelEncoder()
    le_reportedBy = LabelEncoder()
    le_severity = LabelEncoder()
    
    input_df["crimeType"] = le_crimeType.transform(input_df["crimeType"])
    input_df["victim.0.profession"] = le_profession.transform(input_df["victim.0.profession"])
    input_df["reportedBy"] = le_reportedBy.transform(input_df["reportedBy"])

    prediction = model.predict(input_df)
    return le_severity.inverse_transform(prediction)[0]
