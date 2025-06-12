from fastapi import APIRouter
from fastapi.responses import JSONResponse
import joblib
import pandas as pd
## api endpoint http://127.0.0.1:8000/predict/passbuy
# form for json 
# {
#   "predicted_price": 84,
#   "actual_price": 79,
#   "value_diff": 5,
#   "budget": 150,
#   "position_needed": 0,
#   "popularity": 0.27,
#   "performance":0.5 ,
#   "composition_match": 92,
#   "age": 24,
#   "injury_risk": 0.27
# }
#

#
router = APIRouter()


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

    return JSONResponse(content={"prediction": prediction})