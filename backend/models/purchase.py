from pydantic import BaseModel

class PurchaseTable(BaseModel):
    Purchase_Order: str
    Sales_ID: str
    Date: str
    Delivery_Date: str
    Status: str
    Total_Amount: float
