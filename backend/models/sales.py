from pydantic import BaseModel
from pydantic import computed_field

class SalesTable(BaseModel):
    Sales_ID: str
    Sale_Date: str
    Product_ID: str
    Product_Name: str
    Quantity_Sold: int
    Unit_Price: float

    @computed_field
    @property
    def Total_Amount(self) -> float:
        return self.Quantity_Sold * self.Unit_Price
