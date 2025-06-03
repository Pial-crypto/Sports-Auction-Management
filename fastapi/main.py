from fastapi import FastAPI
from routers import xgboost
from routers import passbuy


app = FastAPI(title="Player Market Value Prediction")

# app.include_router(random_forest.router, prefix="/predict", tags=["Random Forest"])
app.include_router(xgboost.router)
app.include_router(passbuy.router)
