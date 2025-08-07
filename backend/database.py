# db.py
from pymongo import MongoClient
import os


def get_database():
    # Retrieve the MongoDB URI and DB name from environment variables
    mongo_url = os.getenv("MONGO_URL", "mongodb://localhost:27017/")
    db_name = os.getenv("MONGO_DB_NAME", "simdb")
    client = MongoClient(mongo_url)
    return client.get_database(db_name)  # Returns the specified database

# Create a db object for import in other modules
db = get_database()
