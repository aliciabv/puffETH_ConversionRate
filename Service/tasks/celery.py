from celery import Celery
from configuration.config import settings

celery_app = Celery('puffer_tasks', broker=settings.redis_url, include=['tasks.update_db'])


celery_app.conf.beat_schedule = {
    'fetch_conversion_rate_every_minute': {
        'task': 'tasks.update_db.calculate_and_store_conversion_rate',
        'schedule': 60.0,
    },
}

celery_app.conf.timezone = 'UTC'
