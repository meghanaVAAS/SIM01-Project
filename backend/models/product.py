from pydantic import BaseModel, ConfigDict

class Products(BaseModel):
    model_config = ConfigDict(coerce_numbers_to_str=True)
    ProductID: str
    ProductName: str
    Category: str
    StockQuantity: int
    UnitPrice: float
