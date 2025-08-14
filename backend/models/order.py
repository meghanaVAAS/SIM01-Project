from pydantic import BaseModel, ConfigDict

from typing import Optional, List, Dict

class Order(BaseModel):
    model_config = ConfigDict(coerce_numbers_to_str=True)
    OrderId: str
    OrderDate: str
    # ...existing code...
    CustomerName: str
    ProductID: Optional[str] = None
    QuantityOrdered: Optional[int] = None
    Products: List[Dict] = []
