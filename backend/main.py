
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes.product import router as product_router
from backend.routes.order import router as order_router
from backend.routes.raw_material import router as raw_material_router
from backend.routes.sales import router as sales_router
from backend.routes.purchase import router as purchase_router
from backend.routes.supplier import router as supplier_router

app = FastAPI()

origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(product_router)
app.include_router(order_router)
app.include_router(raw_material_router)
app.include_router(sales_router)
app.include_router(purchase_router)
app.include_router(supplier_router)
# #    if result.deleted_count == 0:



