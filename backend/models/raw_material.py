from pydantic import BaseModel

class RawMaterials(BaseModel):
    RawMaterial_ID: str
    Product_ID: str
    RawMaterial_Name: str
    unit_of_Measure: str
    Stock_Quantity: int
    SupplierId: str
