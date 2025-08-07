def product_helper(prod):
    return {
        "ProductID": prod.get("ProductID"),
        "ProductName": prod.get("ProductName"),
        "StockQuantity": prod.get("StockQuantity"),
        "Price": prod.get("Price", 0.0),
    }
