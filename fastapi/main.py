from fastapi import FastAPI
from routers import xgboost


app = FastAPI(title="Player Market Value Prediction API")

# app.include_router(random_forest.router, prefix="/predict", tags=["Random Forest"])
app.include_router(xgboost.router)
