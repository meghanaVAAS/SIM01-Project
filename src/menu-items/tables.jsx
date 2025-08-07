

const tableComponents = {
  id: 'tables-group',
  title: 'Tables',
  type: 'group',
  children: [
    {
      id: 'products-collapse',
      title: 'Products',
      type: 'item',
      icon: <i className="ph ph-table" />,
      url: '/tables/bootstrap-table/basic-table',
    },
    {
          id: 'orders-item',
          title: 'Orders',
          type: 'item',
          icon: <i className="ph ph-list" />, // Orders icon
          url: '/tables/bootstrap-table/orders-table'
    },
//      {
//           id: 'product-item',
//           title: 'Product',
//           type: 'item',
//           icon: <i className="ph ph-table" />, // Product icon
//           url: '/tables/bootstrap-table/product-table'
//     },
    {
          id: 'raw-material-item',
          title: 'Raw Materials',
          type: 'item',
          icon: <i className="ph ph-archive" />, // Raw Material icon
          url: '/tables/bootstrap-table/raw-material-table'
    },
    {
          id: 'sales-item',
          title: 'Sales',
          type: 'item',
          icon: <i className="ph ph-chart-bar" />, // Sales icon
          url: '/tables/bootstrap-table/sales-table'
    },
   {
             id: 'purchase-item',
              title: 'Purchase',
              type: 'item',
              icon: <i className="ph ph-shopping-cart" />, // Purchase icon
              url: '/tables/bootstrap-table/purchase-table'
   }]};
 
export default tableComponents;



