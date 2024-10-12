# Puffer Finance Conversion Rate Tracker

## Overview
This project tracks the conversion rates of the PufferVaultV2 contract on Ethereum and stores the data in a SQLite database.

## Prerequisites
- Python 3.8 or higher
- SQLite
- Node.js 

## Backend Servie
1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd <repository-directory>/service
2. **Set up the python virtual environment**
    ```bash
    python -m venv venv
    source venv/bin/activate
3. **Install dependencies**
Make sure you are in the virtual environment and install the required packages:
    ```bash
    pip install -r requirements.txt
4. **Configuration**
Create a `.env` file inside the `configuration` directory with the following contents:
    ```txt
    DATABASE_URL=sqlite:///./test.db
    REDIS_URL=redis://localhost:6379/0
    PUFFER_CONTRACT_ADDRESS=0xD9A442856C234a39a81a089C06451EBAa4306a72
    ETHEREUM_RPC_URL=<YOUR ETHEREUM RPC URL>
To get the ETHEREUM_RPC_URL you can create a free account in https://www.infura.io, create a new API key for Ethereum network and use the HTTPS url provided as the ETHEREUM_RPC_URL. 

5. **Running the application**
Open 3 different terminals inside the `service` directory and run the following commands (one per terminal):
    ```bash 
    uvicorn main:app --reload
    celery -A tasks.celery.celery_app worker --loglevel=info -E
    celery -A tasks.celery.celery_app beat --loglevel=info

Your service is now running!

## Frontend Servie
1. **Install dependencies**
Go to the root of the project, and enter the `puffer-tracker-ui` directory. Install the dependencies runnning:
    ```bash
    npm install
2. **Running the application**
Start the server
    ```bash
    npm start

