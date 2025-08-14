from pydantic import BaseModel

class Supplier(BaseModel):
    Supplier_ID: str
    Supplier_Name: str
    Contact_Name: str
    Phone: int
    Email: str
    Address: str


SupplierTable = Supplier

    