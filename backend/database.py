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
# Ensure unique index on OrderId for Orders collection
try:
    db["Orders"].create_index("OrderId", unique=True)
    db["Products"].create_index("ProductID", unique=True)
except Exception as e:
    print(f"Index creation failed: {e}")
