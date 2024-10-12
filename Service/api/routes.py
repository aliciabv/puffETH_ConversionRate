from fastapi import APIRouter, Depends
from data.db import get_sync_db
from services.puffer_information_retrieval import get_conversion_rates
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
    conversion_rates = get_conversion_rates(db, start_time, end_time)
    return {"conversion_rates": conversion_rates}
