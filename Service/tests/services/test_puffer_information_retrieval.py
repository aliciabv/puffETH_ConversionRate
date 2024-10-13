import pytest
from unittest.mock import MagicMock
from datetime import datetime
from sqlalchemy import select, func
from models.conversion_rate import ConversionRate
from services.puffer_information_retrieval import fetch_conversion_rates, fetch_conversion_rate_statistics

sample_rates = [
    ConversionRate(id=1, rate=100.5, timestamp=datetime(2024, 1, 1, 12, 0, 0)),
    ConversionRate(id=2, rate=101.5, timestamp=datetime(2024, 1, 2, 12, 0, 0)),
    ConversionRate(id=3, rate=102.5, timestamp=datetime(2024, 1, 3, 12, 0, 0)),
]

@pytest.fixture
def mock_db():
    """Fixture to mock the SQLAlchemy session."""
    mock_session = MagicMock()
    return mock_session

def test_fetch_conversion_rates(mock_db):
    mock_db.execute.return_value.scalars.return_value.all.return_value = sample_rates
    
    start_time = datetime(2024, 1, 1)
    end_time = datetime(2024, 1, 3)

    result = fetch_conversion_rates(mock_db, start_time, end_time)

    assert result == sample_rates
    assert len(result) == 3
    assert result[0].rate == 100.5

def test_fetch_conversion_rate_statistics(mock_db):
    mock_db.execute.return_value.fetchone.return_value = {
        "min_rate": 100.5,
        "max_rate": 102.5,
        "mean_rate": 101.5
    }

    start_time = datetime(2024, 1, 1)
    end_time = datetime(2024, 1, 3)

    result = fetch_conversion_rate_statistics(mock_db, start_time, end_time)

    assert result["min_rate"] == 100.5
    assert result["max_rate"] == 102.5
    assert result["mean_rate"] == 101.5
