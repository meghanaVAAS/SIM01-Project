# import os
# from pymongo import MongoClient
# MONGO_URL = os.getenv("MONGO_URL", "mongodb://127.0.0.1:27017/")
# client = MongoClient(MONGO_URL)
# db = client["simdb"]
# collection = db["Products"]




# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],  # React frontend
#     allow_credentials=True,
#     allow_methods=["*"],  # Allows all methods
#     allow_headers=["*"],  # Allows all headers
# )

# @app.get("/products")
# async def get_products():
#     return [{"name": "Product 1"}, {"name": "Product 2"}]

from fastapi import FastAPI

app = FastAPI()


@app.get('/')
def root():
    return("hello world")