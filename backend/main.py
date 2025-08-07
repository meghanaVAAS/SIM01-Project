
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes.product import router as product_router
from backend.routes.order import router as order_router
from backend.routes.raw_material import router as raw_material_router
from backend.routes.sales import router as sales_router
from backend.routes.purchase import router as purchase_router

app = FastAPI()

origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


app.include_router(product_router)
app.include_router(order_router)
app.include_router(raw_material_router)
app.include_router(sales_router)
app.include_router(purchase_router)
# #    if result.deleted_count == 0:



# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel, ConfigDict, computed_field
# from typing import List
# # from datetime import date
# from pymongo import MongoClient
# # from bson.objectid import ObjectId
# import os
# from fastapi.middleware.cors import CORSMiddleware

# app = FastAPI()

# origins = ["http://localhost:3000"]  # adjust  frontend URL
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["GET", "POST", "PUT", "DELETE"],
#     allow_headers=["*"],
# )
# # MongoDB connection
# MONGO_URL = os.getenv("MONGO_URL", "mongodb://127.0.0.1:27017/")
# client = MongoClient(MONGO_URL)
# db = client["simdb"]
# collection = db["Products"]


# class Products(BaseModel):
#     model_config = ConfigDict(coerce_numbers_to_str=True) 
#     ProductID: str
#     ProductName: str
#     StockQuantity: int
#     Price: float


# # Order Modelcd
# class Order(BaseModel):
#     model_config = ConfigDict(coerce_numbers_to_str=True) 
#     OrderId: str
#     ProductId: str
#     QuantityOrdered: int
#     OrderDate: str
#     DeliveryDeadline: str
#     CustomerName: str

# orders_collection = db["Orders"]


# def product_helper(prod):
#     return {
#         "ProductID": prod.get("ProductID"),
#         "ProductName": prod.get("ProductName"),
#         "StockQuantity": prod.get("StockQuantity"),
#         "Price": prod.get("Price", 0.0),
        
#     }
    

# def order_helper(order):
#     return {
#         "OrderId": order.get("OrderId"),
#         "ProductId": order.get("ProductId"),
#         "QuantityOrdered": order.get("QuantityOrdered", 0),
#         "OrderDate": order.get("OrderDate", ""),    
#         "DeliveryDeadline": order.get("DeliveryDeadline", ""),
#         "CustomerName": order.get("CustomerName", ""),
#     }



# #------------------------------- Products Table --------------------------------------------------------

# # --- Product Endpoints ---
# @app.get("/products", response_model=List[Products])
# def get_products():
#     products = list(collection.find())
#     return [product_helper(p) for p in products]


# @app.post("/products", response_model=Products)
# def add_product(product: Products):
#     prod_dict = product.dict()
#     collection.insert_one(prod_dict)
#     return prod_dict


# @app.put("/products/{product_id}", response_model=Products)
# def update_product(product_id: str, product: Products):
#     prod_dict = product.dict()
#     prod_dict["ProductID"] = product_id
#     result = collection.update_one({"ProductID": product_id}, {"$set": prod_dict})
#     if result.matched_count == 0:
#         raise HTTPException(status_code=404, detail="Product not found")
#     return prod_dict


# @app.delete("/products/{product_id}")
# def delete_product(product_id: str):
#     result = collection.delete_one({"ProductID": product_id})
#     if result.deleted_count == 0:
#         raise HTTPException(status_code=404, detail="Product not found")
#     return {"detail": "Deleted"}

# #-----------------------------Orders Table ----------------------------------------------------------


# @app.get("/orders", response_model=List[Order])
# def get_orders():
#     orders = list(orders_collection.find())
#     return [order_helper(o) for o in orders]


# @app.post("/orders", response_model=Order)
# def add_order(order: Order):
#     order_dict = order.dict()
#     orders_collection.insert_one(order_dict)
#     return order_dict


# #-----------------------Raw Material Table -------------------------------------

# # Order Model
# class RawMaterials(BaseModel):
#     RawMaterial_ID: str 
#     Product_ID: str
#     RawMaterial_Name: str
#     unit_of_Measure: str
#     Stock_Quantity: int
#     Price_Unit: float
#     Supplier: str
    

# raw_material_collection = db["RawMaterials"]

# def raw_material_helper(raw):
#     return {
#         "RawMaterial_ID": raw.get("RawMaterial_ID"),
#         "Product_ID": raw.get("Product_ID", ""),  
#         "RawMaterial_Name": raw.get("RawMaterial_Name"),
#         "unit_of_Measure": raw.get("unit_of_Measure"),
#         "Stock_Quantity": raw.get("Stock_Quantity"),
#         "Price_Unit": raw.get("Price_Unit"),
#         "Supplier": raw.get("Supplier", "")
#     }



# @app.get("/raw-materials", response_model=List[RawMaterials])
# def get_raw_materials():
#     raw_materials = list(raw_material_collection.find())
#     return [raw_material_helper(r) for r in raw_materials]


# @app.post("/raw-materials", response_model=RawMaterials)
# def add_raw_material(raw_material: RawMaterials):
#     raw_material_dict = raw_material.dict()
#     raw_material_collection.insert_one(raw_material_dict)
#     return raw_material_dict    


# #-------------------------------Product Table---------------------------------------------------------
# class ProductTable(BaseModel):
#     Product_ID: str 
#     Product_Name: str
#     Stock_Quantity: int
#     Price_Unit: float
    
# product_table_collection = db["ProductTable"]

# def product_table_helper(prods):
#     return {
#         "Product_ID": prods.get("Product_ID"),
#         "Product_Name": prods.get("Product_Name"),
#         "price": prods.get("price"),
#         "Stock_Quantity": prods.get("Stock_Quantity"),
#         "Price_Unit": prods.get("Price_Unit"),
#     }
    
# @app.get("/product-table", response_model=List[ProductTable])
# def get_product_table():
#     products = list(product_table_collection.find())
#     return [product_table_helper(p) for p in products]

# @app.post("/product-table", response_model=ProductTable)
# def add_product_table(product_table: ProductTable):
#     product_table_dict = product_table.dict()
#     product_table_collection.insert_one(product_table_dict)
#     return product_table_dict

# #-------------------------------Sales Table---------------------------------------------------------


# sales_table_collection = db["SalesTable"]



# class SalesTable(BaseModel):
#     Sales_ID: str
#     Sale_Date: str
#     Product_ID: str
#     Product_Name: str
#     Quantity_Sold: int
#     Unit_Price: float

#     @computed_field
#     @property
#     def Total_Amount(self) -> float:
#         return self.Quantity_Sold * self.Unit_Price

# # class SaleOrder(BaseModel):
# #     Sales_ID: str
# #     Sale_Date: str
# #     items: List[SaleLine]

#     # @computed_field
#     # @property
#     # def Total_Amount(self) -> float:
#     #     return sum(item.Total_Amount for item in self.items)



# @app.post("/sales-table", response_model=SalesTable)
# def create_sale_table(order: SalesTable):
#     doc = order.model_dump()
#     sales_table_collection.insert_one(doc)
#     return doc

# @app.get("/sales-table", response_model=List[SalesTable])
# def list_sale_table():
#     docs = list(sales_table_collection.find())
#     return docs

# @app.get("/purchase-table/{sales_id}", response_model=List[SalesTable])
# async def get_purchases_for_sale(sales_id: str):
#     doc = await sales_table_collection.find_one({"Sales_ID": sales_id})
#     if not doc:
#         raise HTTPException(status_code=404, detail="Sales_ID not found")
#     order = SalesTable(**doc)
#     print(order)
#     return order.iteam
   

# #-------------------------------Purchase Table---------------------------------------------------------

# class PurchaseTable(BaseModel):
#     Purchase_Order: str
#     Sales_ID: str
#     Date: str
#     Delivery_Date: str
#     Status: str
#     Total_Amount: float
   

# purchase_table_collection = db["PurchaseTable"]

# def purchase_table_helper(purchase):
#     return {
#         "Purchase_Order": purchase.get("Purchase_Order"),
#         "Sales_ID": purchase.get("Sales_ID"),
#         "Date": purchase.get("Date"),
#         "Delivery_Date": purchase.get("Delivery_Date"),
#         "Status": purchase.get("Status"),
#         "Total_Amount": purchase.get("Total_Amount", 0.0),
#     }

# @app.get("/purchase-table", response_model=List[PurchaseTable])
# def get_purchase_table():
#     purchases = list(purchase_table_collection.find())
#     return [purchase_table_helper(p) for p in purchases]

# @app.post("/purchase-table", response_model=PurchaseTable)
# def add_purchase_table(purchase_table: PurchaseTable):
#     purchase_table_dict = purchase_table.model_dump()
#     purchase_table_collection.insert_one(purchase_table_dict)
#     return purchase_table_dict
