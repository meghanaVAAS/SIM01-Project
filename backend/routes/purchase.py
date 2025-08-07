from fastapi import APIRouter
from typing import List
from backend.database import db
from backend.models.purchase import PurchaseTable
from backend.helpers.purchase import purchase_table_helper

purchase_table_collection = db["PurchaseTable"]

router = APIRouter()

@router.get("/purchase-table", response_model=List[PurchaseTable])
def get_purchase_table():
    purchases = list(purchase_table_collection.find())
    return [purchase_table_helper(p) for p in purchases]

@router.post("/purchase-table", response_model=PurchaseTable)
def add_purchase_table(purchase_table: PurchaseTable):
    purchase_table_dict = purchase_table.model_dump()
    purchase_table_collection.insert_one(purchase_table_dict)
    return purchase_table_dict
