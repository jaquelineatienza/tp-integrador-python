from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np
import pandas as pd
from pydantic import BaseModel
from sklearn.metrics import accuracy_score, classification_report

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Sólo para desarrollo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load('./train/modelo.pkl')
X_test = joblib.load('./train/X_test.pkl')
y_test = joblib.load('./train/y_test.pkl')

# Define los nombres de las características (igual que al entrenar)
feature_names = ['Age', 'Experience', 'Income', 'ZIP Code', 'Family', 'CCAvg', 'Education', 'Mortgage']

class Features(BaseModel):
    features: list[float]

@app.post("/predict")
def predict(data: Features):
    # Convertir input a DataFrame con columnas
    input_df = pd.DataFrame([data.features], columns=feature_names)
    
    # Predecir con el DataFrame para evitar warnings
    prediction = model.predict(input_df)[0]

    # Predicción sobre test para métricas
    y_pred = model.predict(X_test)

    accuracy = accuracy_score(y_test, y_pred)
    report = classification_report(y_test, y_pred, output_dict=True)

    print(f"Predicción: {prediction}")

    report_json = {
        key: {
            sub_key: float(value)
            for sub_key, value in sub_val.items()
        } if isinstance(sub_val, dict) else float(sub_val)
        for key, sub_val in report.items()
    }

    return {
        "prediction": int(prediction),
        "accuracy": float(accuracy),
        "report": report_json
    }
