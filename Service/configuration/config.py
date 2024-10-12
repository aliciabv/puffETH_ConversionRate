from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

class Settings:
    database_url: str = os.getenv("DATABASE_URL")
    redis_url: str = os.getenv("REDIS_URL")
    puffer_contract_address: str = os.getenv("PUFFER_CONTRACT_ADDRESS")
    ethereum_rpc_url: str = os.getenv("ETHEREUM_RPC_URL")

settings = Settings()
