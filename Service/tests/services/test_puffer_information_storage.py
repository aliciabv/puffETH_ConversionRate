import pytest
from unittest.mock import patch, MagicMock
from services.puffer_information_storage import PufferTracker
from models.conversion_rate import ConversionRate

@pytest.fixture
def mock_db():
    """Fixture to mock the SQLAlchemy session."""
    mock_session = MagicMock()
    return mock_session

def test_store_latest_conversion_rate(mock_db):
    with patch('services.puffer_information_storage.PufferContract') as MockPufferContract:
        mock_contract = MockPufferContract.return_value
        mock_contract.fetch_total_assets.return_value = 1000
        mock_contract.fetch_total_supply.return_value = 500

        tracker = PufferTracker()

        tracker.store_latest_conversion_rate(mock_db)

        added_rate = mock_db.add.call_args[0][0]  

        assert isinstance(added_rate, ConversionRate)
        assert added_rate.total_assets == 1000
        assert added_rate.total_supply == 500
        assert added_rate.rate == 1000 / 500

def test_store_latest_conversion_rate_with_zero_supply(mock_db):
    with patch('services.puffer_information_storage.PufferContract') as MockPufferContract:
        mock_contract = MockPufferContract.return_value
        mock_contract.fetch_total_assets.return_value = 1000
        mock_contract.fetch_total_supply.return_value = 0

        tracker = PufferTracker()
        tracker.store_latest_conversion_rate(mock_db)

        added_rate = mock_db.add.call_args[0][0]

        assert isinstance(added_rate, ConversionRate)
        assert added_rate.total_assets == 1000
        assert added_rate.total_supply == 0
        assert added_rate.rate == 0
