from fastapi import APIRouter
from fastapi.responses import JSONResponse
import joblib
import pandas as pd

router = APIRouter()

# Load your trained model
passbuy_model = joblib.load('models/passbuy_model.pkl')
feature_names = joblib.load('models/feature_names_passbuy.pkl')

@router.post("/predict/passbuy")
async def predict_passbuy(input_data: dict):
    
    input_df = pd.DataFrame([input_data])

 
    for col in feature_names:
        if col not in input_df.columns:
            input_df[col] = 0

    
    input_df = input_df[feature_names]

   
    prediction = passbuy_model.predict(input_df)[0]

    
    prediction = float(prediction)

    # Return the prediction in a JSON response
    return JSONResponse(content={"prediction": prediction})