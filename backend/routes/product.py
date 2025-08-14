from fastapi import APIRouter, HTTPException
from typing import List
from backend.database import db
from backend.models.product import Products
from backend.helpers.product import product_helper

collection = db["Products"]

router = APIRouter()

@router.get("/products", response_model=List[Products])
def get_products():
    products = list(collection.find())
    return [product_helper(p) for p in products]

@router.post("/products", response_model=Products)
def add_product(product: Products):
    prod_dict = product.dict()
    # Check for duplicate ProductID
    if collection.find_one({"ProductID": prod_dict["ProductID"]}):
        raise HTTPException(status_code=400, detail="ProductID already exists")
    collection.insert_one(prod_dict)
    return prod_dict

@router.put("/products/{product_id}", response_model=Products)
def update_product(product_id: str, product: Products):
    prod_dict = product.dict()
    prod_dict["ProductID"] = product_id
    result = collection.update_one({"ProductID": product_id}, {"$set": prod_dict})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return prod_dict

@router.delete("/products/{product_id}")
def delete_product(product_id: str):
    result = collection.delete_one({"ProductID": product_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"detail": "Deleted"}
