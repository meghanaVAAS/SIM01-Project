from fastapi import APIRouter
from typing import List     
from backend.database import db
from backend.models.supplier import SupplierTable
from backend.helpers.supplier import supplier_table_helper

supplier_collection = db["SupplierTable"]
router = APIRouter()


@router.get("/suppliers", response_model=List[SupplierTable])
def get_suppliers():
    suppliers = list(supplier_collection.find())
    return [supplier_table_helper(s) for s in suppliers]


# New endpoint: get supplier by ID
@router.get("/suppliers/{supplier_id}", response_model=SupplierTable)
def get_supplier_by_id(supplier_id: str):
    from fastapi import HTTPException
    supplier = supplier_collection.find_one({"Supplier_ID": supplier_id})
    if supplier:
        return supplier_table_helper(supplier)
    raise HTTPException(status_code=404, detail="Supplier not found")


@router.post("/suppliers", response_model=SupplierTable)
def add_supplier(supplier: SupplierTable):
    supplier_dict = supplier.model_dump()
    # Ensure Address is present, remove Status if exists
    if 'Status' in supplier_dict:
        supplier_dict.pop('Status')
    if 'Address' not in supplier_dict:
        supplier_dict['Address'] = ''
    supplier_collection.insert_one(supplier_dict)
    return supplier_dict


# New endpoint: get supplier by name
@router.get("/suppliers/by-name/{supplier_name}", response_model=SupplierTable)
def get_supplier_by_name(supplier_name: str):
    supplier = supplier_collection.find_one({"Supplier_Name": supplier_name})
    if supplier:
        return supplier_table_helper(supplier)
    return None