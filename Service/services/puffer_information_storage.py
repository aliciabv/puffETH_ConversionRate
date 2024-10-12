from services.contract import PufferContract
from models.conversion_rate import ConversionRate
from sqlalchemy.orm import Session

class PufferTracker:
    def __init__(self):
        self.contract = PufferContract()
    
    def store_latest_conversion_rate(self, db: Session):
        total_assets = self.contract.fetch_total_assets()
        total_supply = self.contract.fetch_total_supply()

        rate = total_assets / total_supply if total_supply else 0
        conversion_rate = ConversionRate(
            total_assets=total_assets,
            total_supply=total_supply,
            rate=rate,
        )

        with db.begin():
            db.add(conversion_rate)

