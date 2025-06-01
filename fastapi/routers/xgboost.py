from fastapi import APIRouter
from fastapi.responses import JSONResponse
import joblib
import pandas as pd

router = APIRouter()

# Load your trained model and feature names
xgb_model = joblib.load('models/xgboost_model.pkl')
feature_names = joblib.load('models/feature_names.pkl')

@router.post("/predict/xgboost")
async def predict_xgboost(input_data: dict):
    # Convert input data to DataFrame
    input_df = pd.DataFrame([input_data])

    # Add any missing columns with default value 0
    for col in feature_names:
        if col not in input_df.columns:
            input_df[col] = 0

    # Ensure the column order matches
    input_df = input_df[feature_names]

    # Make prediction
    prediction = xgb_model.predict(input_df)[0]

    # Convert NumPy float32 to native Python float
    prediction = float(prediction)

    # Return the prediction in a JSON response
    return JSONResponse(content={"prediction": prediction})
