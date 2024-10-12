from web3 import Web3
from configuration.config import settings
import json


class PufferContract:
    def __init__(self):
        # Initialize Web3 and the contract instance
        self.web3 = Web3(Web3.HTTPProvider(settings.ethereum_rpc_url))
        self.contract_address = settings.puffer_contract_address

        # Placeholder for the ABI; replace with the actual ABI of the PufferVaultV2 contract
        self.abi = self.load_abi('constants/PufferVaultV2_abi.json')
        self.contract = self.web3.eth.contract(
            address=self.contract_address, abi=self.abi)

    def fetch_total_assets(self):
        # Call the totalAssets function from the contract
        return self.contract.functions.totalAssets().call()

    def fetch_total_supply(self):
        # Call the totalSupply function from the contract
        return self.contract.functions.totalSupply().call()
    
    def load_abi(self, file_path): 
        with open(file_path, 'r') as abi_file:
            return json.load(abi_file)

