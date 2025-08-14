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

# 




# @app.get("/orders/{orderid}")
# async def get_order(orderid: str):
#     if orderid == "12345":
#         return {"message": "Order found"}
#     elif orderid != "12345":
#         return {"message": "Order not found"}
#     return {"message": "Invalid order ID"}






#   const generateOrderId = () =>{
#     return 'ORD-' + Math.random().toString(36).substr(2, 5).toUpperCase();
#   };
#   // const generateOrderId = () => {
#   //   const digits = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join("");
#   //   return 'ORD-' + digits;
#   // };


from fastapi import FastAPI

app = FastAPI()

@app.get('/')
def read_root():
    return {"message":"heloo world"}