from sqlalchemy import Column, Integer, Float, DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class ConversionRate(Base):
    __tablename__ = "puffETH_conversion_rate"
    id = Column(Integer, primary_key=True)
    total_assets = Column(Float, nullable=False)
    total_supply = Column(Float, nullable=False)
    rate = Column(Float, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)