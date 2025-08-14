import { lazy } from 'react';
import DashboardLayout from 'layout/Dashboard';
import Loadable from 'components/Loadable';
import OrderReport from 'views/table/bootstrap-table/OrderReport';

// render - bootstrap table pages
const BootstrapTableBasic = Loadable(lazy(() => import('views/table/bootstrap-table/BasicTable')));
const OrdersTable = Loadable(lazy(() => import('views/table/bootstrap-table/OrdersTable')));
const NewOrder = Loadable(lazy(() => import('sections/tables/bootstrap-table/orders-table/NewOrder')));
const RawMaterialTable = Loadable(lazy(() => import('sections/tables/bootstrap-table/raw-material-table/RawMaterialTable')));
const ProductTable = Loadable(lazy(() => import('sections/tables/bootstrap-table/product-table/ProductTable')));
const SalesTable = Loadable(lazy(() => import('sections/tables/bootstrap-table/sales-table/SalesTable')));
const NewSales = Loadable(lazy(() => import('sections/tables/bootstrap-table/sales-table/NewSales')));
const NewRawMaterial = Loadable(lazy(() => import('sections/tables/bootstrap-table/raw-material-table/NewRawMaterial')));
const PurchaseTable = Loadable(lazy(() => import('sections/tables/bootstrap-table/purchase-table/PurchaseTable')));
// const NewPurchase = Loadable(lazy(() => import ('section/tables/bootstrap-table/purchase-table/NewPurchase')))
const NewPurchase = Loadable(lazy(() => import('sections/tables/bootstrap-table/purchase-table/NewPurchase')));
const SupplierTable = Loadable(lazy(() => import('sections/tables/bootstrap-table/suppliers-table/SuppliersTable')));
const SupplierDetails = Loadable(lazy(() => import('sections/tables/bootstrap-table/suppliers-table/SupplierDetails')));

// ==============================|| TABLES ROUTING ||============================== //

const TablesRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'tables/bootstrap-table',
          children: [
            {
              path: 'basic-table',
              element: <BootstrapTableBasic />
            },
            {
              path: 'orders-table',
              element: <OrdersTable />
            },
            {
              path: 'orders-table/report/:orderId',
              element: <OrderReport />
            },
            {
              path: 'orders-table/new',
              element: <NewOrder />
            },
            {
              path: 'raw-material-table',
              element: <RawMaterialTable />
            },
             {
              path: 'raw-material-table/new',
              element: <NewRawMaterial />
            },
            {
              path: 'product-table',
              element: <ProductTable />
            },
            {
              path: 'sales-table',
              element: <SalesTable />
            },
            {
              path: 'sales-table/new',
              element: <NewSales />
            },
            {
              path: 'purchase-table',
              element: <PurchaseTable />
            },
            {
              path: 'purchase-table/new',
              element: <NewPurchase/>
            },
            {
              path: 'supplier-table',
              element: <SupplierTable />
            },
            {
              path: 'supplier-table/:id',
              element: <SupplierDetails />
            }
           ,
           {
             path: 'supplier-table/by-name/:supplierName',
             element: <SupplierDetails />
           }
           
          ]
        }
      ]
    }
  ]
};

export default TablesRoutes;
