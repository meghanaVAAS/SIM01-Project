from pydantic import BaseModel, ConfigDict

class Order(BaseModel):
    model_config = ConfigDict(coerce_numbers_to_str=True)
    OrderId: str
    ProductId: str
    QuantityOrdered: int
    OrderDate: str
    DeliveryDeadline: str
    CustomerName: str
