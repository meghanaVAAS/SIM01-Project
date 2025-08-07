def purchase_table_helper(purchase):
    return {
        "Purchase_Order": purchase.get("Purchase_Order"),
        "Sales_ID": purchase.get("Sales_ID"),
        "Date": purchase.get("Date"),
        "Delivery_Date": purchase.get("Delivery_Date"),
        "Status": purchase.get("Status"),
        "Total_Amount": purchase.get("Total_Amount", 0.0),
    }
