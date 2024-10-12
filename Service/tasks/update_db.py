import asyncio
from data.db import get_sync_db
from services.puffer_information_storage import PufferTracker
from .celery import celery_app

@celery_app.task
def calculate_and_store_conversion_rate():
    puffer_tracker = PufferTracker()
    session = get_sync_db()
    try:
        puffer_tracker.store_latest_conversion_rate(session)
        session.commit()
    except Exception as e:
        session.rollback()
        raise e
    finally:
        session.close()
