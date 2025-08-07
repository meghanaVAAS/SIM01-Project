from fastapi import APIRouter, HTTPException
from typing import List
from backend.database import db
from backend.models.order import Order
from backend.helpers.order import order_helper

orders_collection = db["Orders"]

router = APIRouter()

@router.get("/orders", response_model=List[Order])
def get_orders():
    orders = list(orders_collection.find())
    return [order_helper(o) for o in orders]


@router.get("/orders/{order_id}", response_model=Order)
def get_order(order_id: str):
    order = orders_collection.find_one({"OrderId": order_id})
    if order:
        return order_helper(order)
    raise HTTPException(status_code=404, detail="Order not found")

@router.post("/orders", response_model=Order)
def add_order(order: Order):
    order_dict = order.dict()
    orders_collection.insert_one(order_dict)
    return order_dict
