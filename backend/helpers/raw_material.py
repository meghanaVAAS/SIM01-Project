def raw_material_helper(raw):
    return {
        "RawMaterial_ID": raw.get("RawMaterial_ID"),
        "Product_ID": raw.get("Product_ID", ""),
        "RawMaterial_Name": raw.get("RawMaterial_Name"),
        "unit_of_Measure": raw.get("unit_of_Measure"),
        "Stock_Quantity": raw.get("Stock_Quantity"),
        "Price_Unit": raw.get("Price_Unit"),
        "Supplier": raw.get("Supplier", "")
    }
