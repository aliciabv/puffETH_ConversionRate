from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from configuration.config import settings
from models.conversion_rate import Base

# Create a regular SQLAlchemy engine for synchronous operations
engine = create_engine(settings.database_url, echo=True)

Base.metadata.create_all(engine)  # This creates the table


# Session factory for synchronous operations
sync_session = sessionmaker(bind=engine)

def get_sync_db():
    return sync_session()