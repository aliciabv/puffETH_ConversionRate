from sqlalchemy import select, func
from models.conversion_rate import ConversionRate
from datetime import datetime
from sqlalchemy.orm import Session

def fetch_conversion_rates(db: Session, start_time: datetime, end_time: datetime):
    # Retrieve conversion rates within the specified timespan
    result = db.execute(
        select(ConversionRate).filter(
            ConversionRate.timestamp >= start_time,
            ConversionRate.timestamp <= end_time
        )
    )
    return result.scalars().all()

def fetch_conversion_rate_statistics(db: Session, start_time: datetime, end_time: datetime):
    result = db.execute(
        select(
            func.min(ConversionRate.rate).label("min_rate"),
            func.max(ConversionRate.rate).label("max_rate"),
            func.avg(ConversionRate.rate).label("mean_rate")
        ).filter(
            ConversionRate.timestamp >= start_time,
            ConversionRate.timestamp <= end_time
        )
    )
    return result.fetchone()