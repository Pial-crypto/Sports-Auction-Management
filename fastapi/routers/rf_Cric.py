from fastapi import APIRouter
from fastapi.responses import JSONResponse
import joblib
import pandas as pd

router = APIRouter()

## api endpoint http://127.0.0.1:8000/predict/rf_cric
# form for json 
# {
#   'mat',
#  'runs',
#  'hs',
#  'avg',
#  '50',
#  '100',
#  'balls',
#  'wkt',
#  'bbi',
#  'ave',
#  '5wi',
#  'ca',
#  'st',
# }
#
rfr_model = joblib.load('models/rf_Cric.pkl')
feature_names = joblib.load('models/cric_feature_names.pkl')

@router.post("/predict/rf_cric")
async def predict_rf_cric(input_data: dict):
    
    input_df = pd.DataFrame([input_data])

 
    for col in feature_names:
        if col not in input_df.columns:
            input_df[col] = 0

    
    input_df = input_df[feature_names]

   
    prediction = rfr_model.predict(input_df)[0]

    
    prediction = float(prediction)

    # Return the prediction in a JSON response
    return JSONResponse(content={"Base value": float(prediction)})
