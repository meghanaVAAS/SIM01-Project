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
    order_dict.pop("id", None)
    # Filter out invalid products before saving
    products = order_dict.get("Products", [])
    valid_products = [p for p in products if p.get("ProductID")]
    order_dict["Products"] = valid_products
    existing_order = orders_collection.find_one({"OrderId": order_dict["OrderId"]})
    if existing_order:
        existing_products = existing_order.get("Products", [])
        product_ids = {p["ProductID"] for p in existing_products}
        for prod in valid_products:
            if prod["ProductID"] not in product_ids:
                existing_products.append(prod)
        orders_collection.update_one(
            {"OrderId": order_dict["OrderId"]},
            {"$set": {"Products": existing_products}}
        )
        updated_order = orders_collection.find_one({"OrderId": order_dict["OrderId"]})
        return order_helper(updated_order)
    else:
        result = orders_collection.insert_one(order_dict)
        order_dict["_id"] = result.inserted_id
        return order_helper(order_dict)
