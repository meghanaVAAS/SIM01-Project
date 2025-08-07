from fastapi import APIRouter
from typing import List
from backend.database import db
from backend.models.sales import SalesTable
from backend.helpers.sales import sales_table_helper

sales_table_collection = db["SalesTable"]

router = APIRouter()

@router.get("/sales-table", response_model=List[SalesTable])
def list_sale_table():
    docs = list(sales_table_collection.find())
    return [sales_table_helper(d) for d in docs]

@router.post("/sales-table", response_model=SalesTable)
def create_sale_table(order: SalesTable):
    doc = order.model_dump()
    sales_table_collection.insert_one(doc)
    return doc
