def sales_table_helper(sale):
    return {
        "Sales_ID": sale.get("Sales_ID"),
        "Sale_Date": sale.get("Sale_Date"),
        "Product_ID": sale.get("Product_ID"),
        "Product_Name": sale.get("Product_Name"),
        "Quantity_Sold": sale.get("Quantity_Sold"),
        "Unit_Price": sale.get("Unit_Price"),
        "Total_Amount": sale.get("Total_Amount", 0.0),
    }
