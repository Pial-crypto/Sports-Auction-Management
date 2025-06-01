from fastapi import APIRouter
import joblib
import pandas as pd
from pydantic import BaseModel

router = APIRouter()

# Load the Random Forest model
rf_model = joblib.load('models/random_forest_model.pkl')

# Define the input data model
class PlayerData(BaseModel):
   
    height: float
    age:int
    appearance:int
    goals  :int
    assists :int
    yellow_cards:int
    second_yellow_cards:int
    red_cards:int
    clean_sheets:int
    minutes_played:int
    days_injured:int
    games_injured:int
    award:int
    highest_value:float
    position_encoded:int
    winger:int
    attack:int
    attack_leftwinger:int
    attack_rightwinger:int
    attack_secondstriker:int
    attack_centre_forward:int
    defender_centre_back:int
    defender_left_back:int
    defender_right_back:int
    goalkeeper:int
    midfield:int
    midfield_attackingmidfield:int
    midfield_centralmidfield:int
    midfield_defensivemidfield:int
    midfield_leftmidfield:int
    midfield_rightmidfield:int
    # Add other features as required

@router.post("/random_forest")
def predict_random_forest(data: PlayerData):
    input_df = pd.DataFrame([data.dict()])
    prediction = rf_model.predict(input_df)[0]
    return {"predicted_market_value": prediction}
		