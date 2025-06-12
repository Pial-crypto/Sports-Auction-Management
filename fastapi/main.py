from fastapi import FastAPI
from routers import xgboost
from routers import passbuy
from routers import rf_Cric
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI(title="Player Market Value Prediction")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# app.include_router(random_forest.router, prefix="/predict", tags=["Random Forest"])
app.include_router(xgboost.router)
app.include_router(passbuy.router)
app.include_router(rf_Cric.router)
