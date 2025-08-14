def order_helper(order):
    products = order.get("Products", [])
    valid_products = [p for p in products if p.get("ProductID")]
    first_product = valid_products[0] if valid_products else {"ProductID": "", "QuantityOrdered": 0}
    return {
        "OrderId": order.get("OrderId"),
        "OrderDate": order.get("OrderDate", ""),
    # ...existing code...
        "CustomerName": order.get("CustomerName", ""),
        "ProductID": first_product.get("ProductID", ""),
        "QuantityOrdered": first_product.get("QuantityOrdered", 0),
        "Products": valid_products
    }





# def order_helper(order):
#     products = order.get("Products", [])
#     valid_products = [p for p in products if p.get("ProductID")]
#     first_product = valid_products[0] if valid_products else {"ProductID": "", "QuantityOrdered": 0}
#     return {
#         "OrderId": order.get("OrderId"),
#         "OrderDate": order.get("OrderDate", ""),
#         # ...existing code...
#         "CustomerName": order.get("CustomerName", ""),
#         "ProductID": first_product.get("ProductID", ""),
#         "QuantityOrdered": first_product.get("QuantityOrdered", 0),
#         "Products": valid_products
#     }