def supplier_table_helper(supplier):
    return {
        "Supplier_ID": supplier.get("Supplier_ID"),
        "Supplier_Name": supplier.get("Supplier_Name"),
        "Contact_Name": supplier.get("Contact_Name"),
        "Phone": supplier.get("Phone"),
        "Email": supplier.get("Email"),
        "Address": supplier.get("Address", ""),
    }