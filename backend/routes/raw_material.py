
from fastapi import APIRouter
from typing import List
# from pydantic import BaseModel
from backend.database import db
from backend.models.raw_material import RawMaterials
from backend.helpers.raw_material import raw_material_helper


raw_material_collection = db["RawMaterials"]
# product_raw_material_collection = db["ProductRawMaterials"]


router = APIRouter()

# Model for mapping product to raw materials
# class ProductRawMaterialMap(BaseModel):
#     product_id: str
#     raw_material_ids: List[str]

@router.get("/raw-materials", response_model=List[RawMaterials])
def get_raw_materials():
    raw_materials = list(raw_material_collection.find())
    return [raw_material_helper(r) for r in raw_materials]

@router.post("/raw-materials", response_model=RawMaterials)
def add_raw_material(raw_material: RawMaterials):
    raw_material_dict = raw_material.dict()
    raw_material_collection.insert_one(raw_material_dict)
    return raw_material_dict



# # Endpoint to insert product with multiple raw material ids
# @router.post("/product-raw-materials")
# def add_product_raw_materials(mapping: ProductRawMaterialMap):
#     mapping_dict = mapping.dict()
#     product_raw_material_collection.insert_one(mapping_dict)
#     return {"message": "Mapping inserted", **mapping_dict}

# # Endpoint to get all product-raw material mappings
# @router.get("/product-raw-materials", response_model=List[ProductRawMaterialMap])
# def get_product_raw_materials():
#     mappings = list(product_raw_material_collection.find())
#     # Remove MongoDB's _id field for Pydantic validation
#     for m in mappings:
#         m.pop("_id", None)
#     return mappings


       