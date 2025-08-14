def product_helper(prod):
    return {
        "ProductID": prod.get("ProductID"),
        "ProductName": prod.get("ProductName"),
        "Category": prod.get("Category", ""),
        "StockQuantity": prod.get("StockQuantity"),
        "UnitPrice": prod.get("UnitPrice", 0.0),
    }
