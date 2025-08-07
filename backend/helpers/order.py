def order_helper(order):
    return {
        "OrderId": order.get("OrderId"),
        "ProductId": order.get("ProductId"),
        "QuantityOrdered": order.get("QuantityOrdered", 0),
        "OrderDate": order.get("OrderDate", ""),
        "DeliveryDeadline": order.get("DeliveryDeadline", ""),
        "CustomerName": order.get("CustomerName", ""),
    }
