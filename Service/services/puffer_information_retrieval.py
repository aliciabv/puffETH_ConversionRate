from sqlalchemy import select
from models.conversion_rate import ConversionRate
from datetime import datetime
from sqlalchemy.orm import Session

def get_conversion_rates(db: Session, start_time: datetime, end_time: datetime):
    # Retrieve conversion rates within the specified timespan
    result = db.execute(
        select(ConversionRate).filter(
            ConversionRate.timestamp >= start_time,
            ConversionRate.timestamp <= end_time
        )
    )
    return result.scalars().all()