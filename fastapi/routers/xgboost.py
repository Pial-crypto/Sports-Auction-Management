from fastapi import APIRouter
from fastapi.responses import JSONResponse
import joblib
import pandas as pd
## api endpoint http://127.0.0.1:8000/predict/xgboost
# form for json 
#  {
#   "height": 189,
#   "age": 32,
#   "appearance": 104,
#   "goals": 0,
#   "assists": 0,
#   "yellow_cards": 0,
#   "second_yellow_cards": 0,
#   "red_cards": 0,
#   "clean_sheets": 25,
#   "minutes_played": 9390,
#   "days_injured": 30,
#   "games_injured": 4,
#   "award": 2,
#   "highest_value": 70000000,
#   "position_encoded": 1,
#   "winger": 0,
#   "attack": 0,
#   "attack_leftwinger": 0,
#   "attack_rightwinger": 0,
#   "attack_secondstriker": 0,
#   "attack_centre_forward": 0,
#   "defender_centre_back": 0,
#   "defender_left_back": 0,
#   "defender_right_back": 0,
#   "goalkeeper": 1,
#   "midfield": 0,
#   "midfield_attackingmidfield": 0,
#   "midfield_centralmidfield": 0,
#   "midfield_defensivemidfield": 0,
#   "midfield_leftmidfield": 0,
#   "midfield_rightmidfield": 0
# }
#
router = APIRouter()

# Load your trained model
xgb_model = joblib.load('models/xgboost_model.pkl')
feature_names = joblib.load('models/feature_names.pkl')

@router.post("/predict/xgboost")
async def predict_xgboost(input_data: dict):
    
    input_df = pd.DataFrame([input_data])

 
    for col in feature_names:
        if col not in input_df.columns:
            input_df[col] = 0

    
    input_df = input_df[feature_names]

   
    prediction = xgb_model.predict(input_df)[0]

    
    prediction = float(prediction)

    # Return the prediction in a JSON response
    return JSONResponse(content={"prediction": prediction})
