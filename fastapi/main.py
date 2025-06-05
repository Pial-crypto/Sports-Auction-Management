from fastapi import FastAPI
from routers import xgboost
from routers import passbuy
from routers import rf_Cric


app = FastAPI(title="Player Market Value Prediction")

# app.include_router(random_forest.router, prefix="/predict", tags=["Random Forest"])
app.include_router(xgboost.router)
app.include_router(passbuy.router)
app.include_router(rf_Cric.router)
