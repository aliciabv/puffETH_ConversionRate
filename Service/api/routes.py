from fastapi import APIRouter, Depends
from data.db import get_sync_db
from services.puffer_information_retrieval import fetch_conversion_rates, fetch_conversion_rate_statistics
from datetime import datetime
from fastapi import Query
from sqlalchemy.orm import Session

router = APIRouter()

@router.get("/conversion-rate/")
def get_conversion_rate(
    start_time: datetime = Query(...),
    end_time: datetime = Query(...),
    db: Session= Depends(get_sync_db)
):
    conversion_rates = fetch_conversion_rates(db, start_time, end_time)
    return {"conversion_rates": conversion_rates}

@router.get("/conversion-rate/statistics")
def get_conversion_rate_statistics(
    start_time: datetime = Query(...),
    end_time: datetime = Query(...),
    db: Session= Depends(get_sync_db)
):
    statistics = fetch_conversion_rate_statistics(db, start_time, end_time)
    return {
        "min_rate": statistics.min_rate,
        "max_rate": statistics.max_rate,
        "mean_rate": statistics.mean_rate
    }
